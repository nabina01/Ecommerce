import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggedInUser, User } from './decorators/user.decorators';
import { CustomBody } from './decorators/custom-body.decorator';
import { UserRole } from './entities/user.entity';
import { Auth } from './decorators/auth.decorators';
import { AuthGuard } from './auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Auth endpoints
  @Post('auth/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signup(createUserDto);
  }

  @Post('auth/login')
  login(
    @CustomBody('email') email: string,
    @CustomBody('password') password: string,
  ) {
    return this.usersService.login(email, password);
  }

  @Post('auth/logout')
  @UseGuards(AuthGuard)
  logout(@User() user: { id: string }) {
    // Logout is handled client-side (token removal)
    // This endpoint serves as a verification point
    return { message: 'Logout successful', userId: user.id };
  }

  @Get('auth/me')
  @UseGuards(AuthGuard)
  getCurrentUser(@User() user: any) {
    return user;
  }

  // User profile endpoints
  @Get('profile/:id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch('profile/:id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // Admin endpoints
  @Get()
  @Auth(UserRole.ADMIN)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
