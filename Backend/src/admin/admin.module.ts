import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, Payment])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
