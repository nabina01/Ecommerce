import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus, PaymentMethod } from './entities/payment.entity';
import { CreatePaymentDto, EsewaPaymentDto, BankPaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  async createPayment(
    userId: string,
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    try {
      const payment = this.paymentRepo.create({
        ...createPaymentDto,
        userId,
        status: PaymentStatus.PENDING,
      });
      return await this.paymentRepo.save(payment);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create payment: ${error}`);
    }
  }

  async createEsewaPayment(userId: string, esewaPaymentDto: EsewaPaymentDto) {
    try {
      const payment = await this.createPayment(userId, {
        orderId: esewaPaymentDto.orderId,
        amount: esewaPaymentDto.amount,
        method: PaymentMethod.ESEWA,
      });

      // Generate eSewa payment signature (simplified mock)
      const esewaPaymentUrl = this.generateEsewaPaymentUrl(payment);
      return {
        payment,
        redirectUrl: esewaPaymentUrl,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create eSewa payment: ${error}`);
    }
  }

  async createBankPayment(userId: string, bankPaymentDto: BankPaymentDto) {
    try {
      const payment = await this.createPayment(userId, {
        orderId: bankPaymentDto.orderId,
        amount: bankPaymentDto.amount,
        method: PaymentMethod.BANK,
      });

      // Store bank details in metadata
      payment.metadata = {
        accountNumber: bankPaymentDto.accountNumber,
        bankName: bankPaymentDto.bankName,
      };

      await this.paymentRepo.save(payment);

      return {
        payment,
        message: 'Bank transfer initiated. Please complete the transfer to the provided account.',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create bank payment: ${error}`);
    }
  }

  async verifyPayment(
    transactionId: string,
    status: 'success' | 'failed',
  ): Promise<Payment> {
    try {
      const payment = await this.paymentRepo.findOne({
        where: { transactionId },
      });

      if (!payment) {
        throw new NotFoundException(`Payment with transaction ID ${transactionId} not found`);
      }

      payment.status = status === 'success' ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;
      return await this.paymentRepo.save(payment);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to verify payment: ${error}`);
    }
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepo.findOne({
        where: { orderId },
      });

      if (!payment) {
        throw new NotFoundException(`Payment for order ${orderId} not found`);
      }

      return payment;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch payment: ${error}`);
    }
  }

  async getPaymentsByUser(userId: string): Promise<Payment[]> {
    try {
      return await this.paymentRepo.find({
        where: { userId },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch payments: ${error}`);
    }
  }

  async getAllPayments(): Promise<Payment[]> {
    try {
      return await this.paymentRepo.find({
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch payments: ${error}`);
    }
  }

  private generateEsewaPaymentUrl(payment: Payment): string {
    // This is a mock implementation. In production, integrate with actual eSewa API
    const esewaConfig = {
      amt: payment.amount,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: payment.amount,
      pid: payment.id,
      scd: process.env.ESEWA_MERCHANT_CODE || 'EPAYTEST',
      su: process.env.ESEWA_SUCCESS_URL || 'http://localhost:3000/payment/success',
      fu: process.env.ESEWA_FAILURE_URL || 'http://localhost:3000/payment/failed',
    };

    const params = new URLSearchParams(esewaConfig as any);
    return `https://uat.esewa.com.np/epay/main?${params.toString()}`;
  }
}
