import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductsService {
  getProductById() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  getAllProducts(): Promise<Product[]> {
    try {
      return this.productRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  getOneProduct(id: string): Promise<Product | null> {
    try {
      return this.productRepository.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  addProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create(createProductDto);
      return this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const existingProduct = await this.productRepository.findOneBy({ id });
      if (!existingProduct) {
        throw new InternalServerErrorException('Product not found');
      }
      const updatedProduct = this.productRepository.merge(
        existingProduct,
        updateProductDto,
      );
      return this.productRepository.save(updatedProduct);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteProduct(id: string) {
    try {
      await this.productRepository.delete(id);
      return 'Deleted Successfully';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
