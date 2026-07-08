import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { User } from 'src/users/decorators/user.decorators';
import { CartItem } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(AuthGuard)
  getCart(@User() user: { id: string }): Promise<CartItem[]> {
    return this.cartService.getCart(user.id);
  }

  @Get('summary')
  @UseGuards(AuthGuard)
  getCartSummary(@User() user: { id: string }) {
    return this.cartService.getCartSummary(user.id);
  }

  @Post('add')
  @UseGuards(AuthGuard)
  addItem(
    @User() user: { id: string },
    @Body() createCartDto: CreateCartDto,
  ): Promise<CartItem> {
    return this.cartService.addItem(user.id, createCartDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateQuantity(
    @User() user: { id: string },
    @Param('id') itemId: string,
    @Body() body: { quantity: number },
  ): Promise<CartItem> {
    return this.cartService.updateQuantity(user.id, itemId, body.quantity);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  removeItem(@User() user: { id: string }, @Param('id') itemId: string) {
    return this.cartService.removeItem(user.id, itemId);
  }

  @Delete()
  @UseGuards(AuthGuard)
  clearCart(@User() user: { id: string }) {
    return this.cartService.clearCart(user.id);
  }
}
