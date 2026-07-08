import { IsNumber, IsString, IsEnum, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { PaymentMethod } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsOptional()
  @IsString()
  transactionId?: string;
}

export class EsewaPaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}

export class BankPaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  bankName: string;
}

export class PaymentVerificationDto {
  @IsNotEmpty()
  @IsString()
  transactionId: string;

  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
