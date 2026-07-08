import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, EsewaPaymentDto, BankPaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { User } from 'src/users/decorators/user.decorators';
import { Auth } from 'src/users/decorators/auth.decorators';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UseGuards(AuthGuard)
  createPayment(@User() user: { id: string }, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(user.id, createPaymentDto);
  }

  @Post('esewa')
  @UseGuards(AuthGuard)
  createEsewaPayment(@User() user: { id: string }, @Body() esewaPaymentDto: EsewaPaymentDto) {
    return this.paymentService.createEsewaPayment(user.id, esewaPaymentDto);
  }

  @Post('bank')
  @UseGuards(AuthGuard)
  createBankPayment(@User() user: { id: string }, @Body() bankPaymentDto: BankPaymentDto) {
    return this.paymentService.createBankPayment(user.id, bankPaymentDto);
  }

  @Post('verify/:transactionId')
  verifyPayment(
    @Param('transactionId') transactionId: string,
    @Body() body: { status: 'success' | 'failed' },
  ) {
    return this.paymentService.verifyPayment(transactionId, body.status);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  getUserPayments(@User() user: { id: string }) {
    return this.paymentService.getPaymentsByUser(user.id);
  }

  @Get('order/:orderId')
  @UseGuards(AuthGuard)
  getPaymentByOrderId(@Param('orderId') orderId: string) {
    return this.paymentService.getPaymentByOrderId(orderId);
  }

  @Get()
  @Auth(UserRole.ADMIN)
  getAllPayments() {
    return this.paymentService.getAllPayments();
  }
}
