import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepo: Repository<Wishlist>,
  ) {}

  async addToWishlist(userId: string, productId: string) {
    const existing = await this.wishlistRepo.findOne({
      where: { userId, productId },
    });

    if (existing) {
      throw new BadRequestException('Product already in wishlist');
    }

    const wishlist = this.wishlistRepo.create({ userId, productId });
    return await this.wishlistRepo.save(wishlist);
  }

  async removeFromWishlist(id: string) {
    const wishlist = await this.wishlistRepo.findOne({ where: { id } });
    if (!wishlist) {
      throw new NotFoundException('Wishlist item not found');
    }
    return await this.wishlistRepo.remove(wishlist);
  }

  async getWishlist(userId: string) {
    return await this.wishlistRepo.find({
      where: { userId },
      relations: ['product'],
    });
  }

  async moveToCart(id: string) {
    const wishlist = await this.wishlistRepo.findOne({ where: { id } });
    if (!wishlist) {
      throw new NotFoundException('Wishlist item not found');
    }
    return { success: true, productId: wishlist.productId };
  }
}
