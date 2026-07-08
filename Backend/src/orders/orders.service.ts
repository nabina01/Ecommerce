import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderStatus, PaymentMethod } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

const TAX_RATE = 0.13; // 13% tax rate
const SHIPPING_COST = 150; // Flat shipping cost

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private dataSource: DataSource,
  ) {}

  async createOrder(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.dataSource.manager.transaction(async (manager) => {
        const subtotal = createOrderDto.orderItems.reduce(
          (sum, item) => sum + item.quantity * Number(item.price),
          0,
        );

        const taxAmount = Math.round((subtotal * TAX_RATE) * 100) / 100;
        const shippingCost = SHIPPING_COST;
        const discountAmount = createOrderDto.discountAmount || 0;
        const totalAmount = subtotal + taxAmount + shippingCost - discountAmount;

        const order = manager.create(Order, {
          userId,
          subtotal,
          taxAmount,
          shippingCost,
          discountAmount,
          totalAmount,
          shippingAddress: createOrderDto.shippingAddress,
          billingAddress: createOrderDto.billingAddress || createOrderDto.shippingAddress,
          paymentMethod: createOrderDto.paymentMethod,
          status: OrderStatus.PENDING,
          paymentStatus: 'pending',
        });

        const savedOrder = await manager.save(order);

        const orderItems = createOrderDto.orderItems.map((item) =>
          manager.create(OrderItem, {
            orderId: savedOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }),
        );

        await manager.save(orderItems);
        return manager.findOne(Order, {
          where: { id: savedOrder.id },
          relations: ['orderItems'],
        });
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create order: ${error}`);
    }
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      return await this.orderRepository.find({
        where: { userId },
        relations: ['orderItems'],
        order: { orderDate: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch user orders: ${error}`);
    }
  }

  async getOrderById(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['orderItems'],
      });
      if (!order) throw new NotFoundException(`Order ${id} not found`);
      return order;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch order: ${error}`);
    }
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    try {
      const order = await this.getOrderById(id);
      order.status = status;
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update order: ${error}`);
    }
  }

  async updatePaymentStatus(id: string, status: string): Promise<Order> {
    try {
      const order = await this.getOrderById(id);
      order.paymentStatus = status;
      if (status === 'success') {
        order.status = OrderStatus.CONFIRMED;
      }
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update payment status: ${error}`);
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.orderRepository.find({
        relations: ['orderItems'],
        order: { orderDate: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch orders: ${error}`);
    }
  }

  async deleteOrder(id: string): Promise<{ message: string }> {
    try {
      const order = await this.getOrderById(id);
      await this.orderRepository.remove(order);
      return { message: 'Order deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete order: ${error}`);
    }
  }
}
