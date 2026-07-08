import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Auth } from 'src/users/decorators/auth.decorators';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('admin')
@Auth(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard/stats')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('dashboard/recent-orders')
  getRecentOrders(@Query('limit') limit: number = 10) {
    return this.adminService.getRecentOrders(Number(limit));
  }

  @Get('dashboard/recent-users')
  getRecentUsers(@Query('limit') limit: number = 10) {
    return this.adminService.getRecentUsers(Number(limit));
  }

  @Get('dashboard/top-products')
  getTopProducts(@Query('limit') limit: number = 10) {
    return this.adminService.getTopProducts(Number(limit));
  }

  @Get('dashboard/order-stats')
  getOrderStats() {
    return this.adminService.getOrderStats();
  }

  @Get('dashboard/payment-stats')
  getPaymentStats() {
    return this.adminService.getPaymentStats();
  }
}
