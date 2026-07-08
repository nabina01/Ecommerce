import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
  ) {}

  async createReview(userId: string, createReviewDto: CreateReviewDto) {
    if (createReviewDto.rating < 1 || createReviewDto.rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const review = this.reviewRepo.create({
      ...createReviewDto,
      userId,
    });

    return await this.reviewRepo.save(review);
  }

  async getProductReviews(productId: string) {
    return await this.reviewRepo.find({
      where: { productId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getProductRating(productId: string) {
    const reviews = await this.reviewRepo.find({
      where: { productId },
    });

    if (reviews.length === 0) return 0;

    const average =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    return Math.round(average * 10) / 10;
  }

  async updateReview(id: string, userId: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepo.findOne({ where: { id } });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.userId !== userId) {
      throw new BadRequestException('You can only edit your own reviews');
    }

    if (updateReviewDto.rating && (updateReviewDto.rating < 1 || updateReviewDto.rating > 5)) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    return await this.reviewRepo.update(id, updateReviewDto);
  }

  async deleteReview(id: string, userId: string) {
    const review = await this.reviewRepo.findOne({ where: { id } });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.userId !== userId) {
      throw new BadRequestException('You can only delete your own reviews');
    }

    return await this.reviewRepo.remove(review);
  }
}
