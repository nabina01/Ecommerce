import { Category } from 'src/categories/entities/categories.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface Variant {
  color: string;
  size: string;
  stock: number;
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  categoryId: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text')
  description: string;

  @Column('simple-array', { nullable: true })
  imageUrls: string[];

  @Column({ type: 'jsonb', default: '[]' })
  variants: Variant[];

  @Column('int', { default: 0 })
  stock: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
