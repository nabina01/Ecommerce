import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart.entity';
import { PaymentService } from '../payment/payment.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { CheckoutCartDto } from './dto/checkout-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,
    private paymentService: PaymentService,
  ) {}

  findAll() {
    return this.cartRepo.find();
  }

  async addItem(dto: CreateCartDto) {
    const item = this.cartRepo.create(dto);
    return await this.cartRepo.save(item);
  }

  async removeItem(id: number) {
    await this.cartRepo.delete(id);
    return { message: `Item ${id} removed` };
  }

  async clearCart() {
    await this.cartRepo.clear();
    return { message: 'Cart cleared' };
  }

  async checkout(dto: CheckoutCartDto) {
    const items = await this.cartRepo.find({ where: { userId: String(dto.userId) } });
    if (items.length === 0) {
      return { message: 'Cart is empty' };
    }

    const totalAmount = items.reduce((sum, item) => sum + Number(item.price), 0);
    const payment = await this.paymentService.makePayment(totalAmount, dto.method, dto.userId);

    await this.cartRepo.clear();
    return { message: 'Checkout complete', payment };
  }
}
