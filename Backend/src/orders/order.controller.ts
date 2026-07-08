import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entities/order.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { User } from 'src/users/decorators/user.decorators';
import { Auth } from 'src/users/decorators/auth.decorators';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('my-orders')
  @UseGuards(AuthGuard)
  getUserOrders(@User() user: { id: string }) {
    return this.ordersService.getUserOrders(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createOrder(
    @User() user: { id: string },
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(user.id, createOrderDto);
  }

  @Put(':id/status')
  @Auth(UserRole.ADMIN)
  updateOrderStatus(
    @Param('id') id: string,
    @Body() body: { status: OrderStatus },
  ) {
    return this.ordersService.updateOrderStatus(id, body.status);
  }

  @Put(':id/payment-status')
  @UseGuards(AuthGuard)
  updatePaymentStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.ordersService.updatePaymentStatus(id, body.status);
  }

  @Get()
  @Auth(UserRole.ADMIN)
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
