import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(@Body() productBody: CreateProductDto) {
    return this.productsService.addProduct(productBody);
  }

  @Put('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Get()
  getAllProduct(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getOneProduct(id);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  // @Post()
  // createProduct(
  //   @Req() req: Express.Request,
  //   @Res() res: Express.Response,

  //   @Body('name') name: string,
  //   @Body('price') price: number,
  // ): void {
  //   console.log(req);
  //   console.log(name, price);

  //   res.status(HttpStatus.CREATED).send({
  //     message: `product ${name} with price ${price} created successfully!`,
  //   });
  // }
  // @Post('/create')
  // addProduct(@Body() createProductDto: CreateProductDto) {
  //   console.log(createProductDto)
  // }
  // @Put('/:id')
  // updateProduct(@Param('id') id: string, @Query('data') data: string) {
  //   if (id == 'hello') {
  //     throw new ForbiddenException('you are not allowed to update hello');
  //   }
  //   return `Hello from put request and id is ${id} and data is ${data}`;
  // }
  // @Delete('/:id')
  // deleteProduct(@Param('id', ParseIntPipe) id: number
  // ): string {
  //   console.log(typeof id);
  //   return `Hello from delete request and id is ${id}`
  // }
}
