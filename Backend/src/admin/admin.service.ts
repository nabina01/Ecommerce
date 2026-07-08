import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Payment, PaymentStatus } from 'src/payment/entities/payment.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  async getDashboardStats() {
    try {
      const totalOrders = await this.orderRepo.count();
      const totalUsers = await this.userRepo.count();
      const totalProducts = await this.productRepo.count();
      const totalRevenue = await this.getTotalRevenue();
      const completedOrders = await this.orderRepo.count({
        where: { status: OrderStatus.DELIVERED },
      });
      const pendingOrders = await this.orderRepo.count({
        where: { status: OrderStatus.PENDING },
      });
      const successfulPayments = await this.paymentRepo.count({
        where: { status: PaymentStatus.SUCCESS },
      });

      return {
        totalOrders,
        totalUsers,
        totalProducts,
        totalRevenue,
        completedOrders,
        pendingOrders,
        successfulPayments,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get dashboard stats: ${error}`);
    }
  }

  async getTotalRevenue(): Promise<number> {
    try {
      const payments = await this.paymentRepo.find({
        where: { status: PaymentStatus.SUCCESS },
      });
      return payments.reduce((sum, p) => sum + Number(p.amount), 0);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to calculate revenue: ${error}`);
    }
  }

  async getRecentOrders(limit: number = 10) {
    try {
      return await this.orderRepo.find({
        order: { orderDate: 'DESC' },
        take: limit,
        relations: ['orderItems'],
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch recent orders: ${error}`);
    }
  }

  async getRecentUsers(limit: number = 10) {
    try {
      return await this.userRepo.find({
        order: { createdAt: 'DESC' },
        take: limit,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch recent users: ${error}`);
    }
  }

  async getTopProducts(limit: number = 10) {
    try {
      const products = await this.productRepo.find({
        order: { createdAt: 'DESC' },
        take: limit,
        where: { isActive: true },
      });
      return products;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch top products: ${error}`);
    }
  }

  async getOrderStats() {
    try {
      const all = await this.orderRepo.count();
      const pending = await this.orderRepo.count({
        where: { status: OrderStatus.PENDING },
      });
      const confirmed = await this.orderRepo.count({
        where: { status: OrderStatus.CONFIRMED },
      });
      const shipped = await this.orderRepo.count({
        where: { status: OrderStatus.SHIPPED },
      });
      const delivered = await this.orderRepo.count({
        where: { status: OrderStatus.DELIVERED },
      });
      const cancelled = await this.orderRepo.count({
        where: { status: OrderStatus.CANCELLED },
      });

      return { all, pending, confirmed, shipped, delivered, cancelled };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get order stats: ${error}`);
    }
  }

  async getPaymentStats() {
    try {
      const totalPayments = await this.paymentRepo.count();
      const successfulPayments = await this.paymentRepo.count({
        where: { status: PaymentStatus.SUCCESS },
      });
      const failedPayments = await this.paymentRepo.count({
        where: { status: PaymentStatus.FAILED },
      });
      const pendingPayments = await this.paymentRepo.count({
        where: { status: PaymentStatus.PENDING },
      });

      return {
        totalPayments,
        successfulPayments,
        failedPayments,
        pendingPayments,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get payment stats: ${error}`);
    }
  }
}
