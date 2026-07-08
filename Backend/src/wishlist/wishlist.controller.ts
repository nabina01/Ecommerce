import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { User } from 'src/users/decorators/user.decorators';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('add')
  @UseGuards(AuthGuard)
  addToWishlist(
    @User() user: { id: string },
    @Body() body: { productId: string },
  ) {
    return this.wishlistService.addToWishlist(user.id, body.productId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  removeFromWishlist(@Param('id') id: string) {
    return this.wishlistService.removeFromWishlist(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  getWishlist(@User() user: { id: string }) {
    return this.wishlistService.getWishlist(user.id);
  }

  @Post(':id/move-to-cart')
  @UseGuards(AuthGuard)
  moveToCart(@Param('id') id: string) {
    return this.wishlistService.moveToCart(id);
  }
}
