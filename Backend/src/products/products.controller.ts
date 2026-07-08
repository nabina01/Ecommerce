import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  Get,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/users/decorators/auth.decorators';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('sortBy') sortBy: 'price' | 'name' | 'createdAt' = 'createdAt',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
  ) {
    return this.productsService.getAll(
      Number(page),
      Number(limit),
      search,
      categoryId,
      sortBy,
      sortOrder,
    );
  }

  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.productsService.searchByName(name);
  }

  @Get('category/:categoryId')
  getByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.getByCategory(categoryId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Post()
  @Auth(UserRole.ADMIN)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Put(':id')
  @Auth(UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
