import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
  addCategory(categoryBody: CreateCategoryDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  getCategoryById(id: string) {
    try {
      return this.categoryRepository.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Get all categories with optional filters
  async getAllCategories(filters?: {
    isActive?: string;
    search?: string;
  }): Promise<Category[]> {
    try {
      const query = this.categoryRepository.createQueryBuilder('category');

      if (filters?.search) {
        query.andWhere('category.name LIKE :search', {
          search: `%${filters.search}%`,
        });
      }

      if (filters?.isActive !== undefined) {
        query.andWhere('category.isActive = :isActive', {
          isActive: filters.isActive === 'true',
        });
      }

      return await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Get one category by ID
  getOneCategory(id: string): Promise<Category | null> {
    try {
      return this.categoryRepository.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Create a new category
  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create(dto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Update a category
  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const existingCategory = await this.categoryRepository.findOneBy({ id });
      if (!existingCategory) {
        throw new InternalServerErrorException('Category not found');
      }
      const updatedCategory = this.categoryRepository.merge(
        existingCategory,
        updateCategoryDto,
      );
      return this.categoryRepository.save(updatedCategory);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Delete a category
  async deleteCategory(id: string) {
    try {
      await this.categoryRepository.delete(id);
      return 'Deleted Successfully';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
