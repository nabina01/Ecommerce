import {
  IsOptional,
  IsString,
  IsIn,
  MinLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems?: OrderItemDto[];

  @IsOptional()
  @IsString()
  @MinLength(10)
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  @IsIn(['credit_card', 'debit_card', 'paypal', 'cash_on_delivery'])
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  @IsIn(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
  status?: string;
}
