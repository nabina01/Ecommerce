import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,
  ) {}

  async addItem(userId: string, createCartDto: CreateCartDto): Promise<CartItem> {
    try {
      // Check if item already exists in cart
      const existing = await this.cartRepo.findOne({
        where: {
          userId,
          productId: createCartDto.productId,
        },
      });

      if (existing) {
        // Update quantity
        existing.quantity += createCartDto.quantity;
        return await this.cartRepo.save(existing);
      }

      const item = this.cartRepo.create({
        ...createCartDto,
        userId,
      });
      return await this.cartRepo.save(item);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to add item to cart: ${error}`);
    }
  }

  async getCart(userId: string): Promise<CartItem[]> {
    try {
      return await this.cartRepo.find({
        where: { userId },
        relations: ['product'],
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch cart: ${error}`);
    }
  }

  async updateQuantity(userId: string, itemId: string, quantity: number): Promise<CartItem> {
    try {
      if (quantity < 1) {
        throw new BadRequestException('Quantity must be at least 1');
      }

      const item = await this.cartRepo.findOne({
        where: { id: itemId, userId },
      });

      if (!item) {
        throw new NotFoundException('Cart item not found');
      }

      item.quantity = quantity;
      return await this.cartRepo.save(item);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update quantity: ${error}`);
    }
  }

  async removeItem(userId: string, itemId: string): Promise<{ message: string }> {
    try {
      const item = await this.cartRepo.findOne({
        where: { id: itemId, userId },
      });

      if (!item) {
        throw new NotFoundException('Cart item not found');
      }

      await this.cartRepo.remove(item);
      return { message: 'Item removed from cart' };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to remove item: ${error}`);
    }
  }

  async clearCart(userId: string): Promise<{ message: string }> {
    try {
      await this.cartRepo.delete({ userId });
      return { message: 'Cart cleared' };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to clear cart: ${error}`);
    }
  }

  async getCartSummary(userId: string): Promise<{
    items: CartItem[];
    subtotal: number;
    itemCount: number;
  }> {
    try {
      const items = await this.getCart(userId);
      const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

      return {
        items,
        subtotal,
        itemCount: items.length,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get cart summary: ${error}`);
    }
  }
}
