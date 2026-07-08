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
import { ReviewService } from './reviews.service';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { User } from 'src/users/decorators/user.decorators';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReview(
    @User() user: { id: string },
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.createReview(user.id, createReviewDto);
  }

  @Get('product/:productId')
  getProductReviews(@Param('productId') productId: string) {
    return this.reviewService.getProductReviews(productId);
  }

  @Get('product/:productId/rating')
  getProductRating(@Param('productId') productId: string) {
    return this.reviewService.getProductRating(productId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateReview(
    @Param('id') id: string,
    @User() user: { id: string },
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(id, user.id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteReview(@Param('id') id: string, @User() user: { id: string }) {
    return this.reviewService.deleteReview(id, user.id);
  }
}
