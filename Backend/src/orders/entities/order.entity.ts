import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from 'src/users/entities/user.entity';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  ESEWA = 'esewa',
  BANK = 'bank',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  taxAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  shippingCost: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0, nullable: true })
  discountAmount?: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column()
  shippingAddress: string;

  @Column({ nullable: true })
  billingAddress: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({ nullable: true })
  paymentTransactionId: string;

  @Column({ default: 'pending' })
  paymentStatus: string;

  @CreateDateColumn()
  orderDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveryDate?: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}
