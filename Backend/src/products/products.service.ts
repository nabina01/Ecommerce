import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      // Calculate total stock from variants
      const totalStock = createProductDto.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;

      const product = this.productRepository.create({
        ...createProductDto,
        stock: createProductDto.stock || totalStock,
      });
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create product: ${error}`);
    }
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    categoryId?: string,
    sortBy: 'price' | 'name' | 'createdAt' = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
    try {
      const query = this.productRepository.createQueryBuilder('product');

      if (search) {
        query.where('product.name ILIKE :search OR product.description ILIKE :search', {
          search: `%${search}%`,
        });
      }

      if (categoryId) {
        query.andWhere('product.categoryId = :categoryId', { categoryId });
      }

      query.andWhere('product.isActive = :isActive', { isActive: true });

      const [data, total] = await query
        .orderBy(`product.${sortBy}`, sortOrder)
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return { data, total, page, limit };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch products: ${error}`);
    }
  }

  async getById(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch product: ${error}`);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.getById(id);

      // Recalculate stock if variants changed
      if (updateProductDto.variants) {
        const totalStock = updateProductDto.variants.reduce((sum, v) => sum + v.stock, 0);
        updateProductDto.stock = totalStock;
      }

      const updated = this.productRepository.merge(product, updateProductDto);
      return await this.productRepository.save(updated);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update product: ${error}`);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const product = await this.getById(id);
      await this.productRepository.remove(product);
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete product: ${error}`);
    }
  }

  async reduceStock(id: string, quantity: number): Promise<Product> {
    try {
      const product = await this.getById(id);

      if (product.stock < quantity) {
        throw new BadRequestException('Insufficient stock available');
      }

      product.stock -= quantity;
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to reduce stock: ${error}`);
    }
  }

  async searchByName(name: string): Promise<Product[]> {
    try {
      return await this.productRepository.find({
        where: { name: Like(`%${name}%`), isActive: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to search products: ${error}`);
    }
  }

  async getByCategory(categoryId: string): Promise<Product[]> {
    try {
      return await this.productRepository.find({
        where: { categoryId, isActive: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch products by category: ${error}`);
    }
  }
}
