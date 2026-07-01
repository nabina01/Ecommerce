import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order, PaymentMethod, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    private dataSource: DataSource,
  ) {}

  // Get all orders
  async getAllOrders(): Promise<Order[]> {
    try {
      return this.orderRepository.find({ relations: ['orderItems'] });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Get order by id
  async getOrderById(id: number): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: id.toString() },
        relations: ['orderItems'],
      });
      if (!order) throw new NotFoundException(`Order ${id} not found`);
      return order;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Create new order
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order | null> {
    const totalAmount = createOrderDto.orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    try {
      return await this.dataSource.manager.transaction(
        async (transactionalEntityManager) => {
          // Create and save order
          const order = transactionalEntityManager.create(Order, {
            ...createOrderDto,
            totalAmount,
            paymentMethod: createOrderDto.paymentMethod as PaymentMethod,
          });

          const createdOrder = await transactionalEntityManager.save(order);

          const orderItems = createOrderDto.orderItems.map((item) =>
            transactionalEntityManager.create(OrderItem, {
              ...item,
              productId: { id: item.productId },
              order: createdOrder,
            }),
          );

          await transactionalEntityManager.save(orderItems);

          // Return the full order with items
          return transactionalEntityManager.findOne(Order, {
            where: { id: createdOrder.id },
            relations: ['orderItems'],
          });
        },
      );

      //   const order = this.orderRepository.create({
      //     ...createOrderDto,
      //     totalAmount,
      //     status: OrderStatus.PENDING, // default status
      //     orderItems: createOrderDto.orderItems,
      //     paymentMethod: createOrderDto.paymentMethod as PaymentMethod,
      //   });

      //   return this.orderRepository.save(order);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  // Update order
  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    try {
      const existingOrder = await this.orderRepository.findOne({
        where: { id: id.toString() },
        relations: ['orderItems'],
      });
      if (!existingOrder) throw new NotFoundException(`Order ${id} not found`);

      // Merge DTO into existing order
      const updatedOrder = this.orderRepository.merge(existingOrder, {
        ...updateOrderDto,
        paymentMethod: updateOrderDto.paymentMethod as PaymentMethod,
        status: updateOrderDto.status as OrderStatus,
      });

      // Recalculate totalAmount if orderItems updated
      if (updateOrderDto.orderItems) {
        updatedOrder.totalAmount = updateOrderDto.orderItems.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0,
        );
      }

      return this.orderRepository.save(updatedOrder);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Update only order status
  async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
    try {
      const existingOrder = await this.orderRepository.findOne({
        where: { id: id.toString() },
        relations: ['orderItems'],
      });
      if (!existingOrder) throw new NotFoundException(`Order ${id} not found`);

      existingOrder.status = status;
      return this.orderRepository.save(existingOrder);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Delete order
  async deleteOrder(id: number): Promise<string> {
    try {
      const existingOrder = await this.orderRepository.findOne({
        where: { id: id.toString() },
      });
      if (!existingOrder) throw new NotFoundException(`Order ${id} not found`);

      await this.orderRepository.delete(id);
      return 'Deleted Successfully';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
