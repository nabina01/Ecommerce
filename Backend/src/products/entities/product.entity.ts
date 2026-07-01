import { Category } from 'src/categories/entities/categories.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  imageUrls: string;

  @Column({ type: 'jsonb' }) //jasonb  stored in a binary format
  variants: variant[]; //array of objects

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
  category: any;

  @ManyToOne(() => Category, (category) => category.products)
  categories: Category;
}

type variant = {
  color: string;
  size: string;
  stock: number;
};
