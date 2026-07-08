import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // CREATE USER
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser)
      throw new ConflictException('User with this email already exists');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    // Omit password rom response
    return Object.fromEntries(
      Object.entries(savedUser).filter(([key]) => key !== 'password')
    ) as Omit<User, 'password'>;
  }

  // GET ALL USERS
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(user => this.excludePassword(user));
  }

  // GET USER BY ID
  async getUserById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id: String(id) },
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return this.excludePassword(user);
  }

  private excludePassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // UPDATE USER
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) throw new ConflictException('Email already in use');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(id, updateUserDto);
    return this.getUserById(id);
  }

  // DELETE USER
  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }

  // LOGIN USER
  async login(email: string, password: string): Promise<{ token: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
        select: ['id', 'email', 'password'],
      });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new UnauthorizedException('Invalid credentials');

      const token = await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      });

      // return both
      return { token };
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  
  //Signup user
  async signup(createUserDto: CreateUserDto): Promise<{ token: string }> {
  // Ensure role is set
  const dtoWithRole = { ...createUserDto, role: createUserDto.role || 'user' };

  // Create user with role
  await this.createUser(dtoWithRole);

  // Login with original email/password
  return this.login(dtoWithRole.email, dtoWithRole.password);
}

}
