import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async createReview(
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    const existingReview = await this.prismaService.review.findFirst({
      where: {
        trail_id: createReviewDto.trailId,
        user_id: createReviewDto.userId,
      },
    });
    if (existingReview) {
      throw new NotFoundException(
        'Review already exists for this trail by this user',
      );
    }
    const review = await this.prismaService.review.create({
      data: {
        trail_id: createReviewDto.trailId,
        user_id: createReviewDto.userId,
        rating: createReviewDto.rating,
        review_text: createReviewDto.comment,
        difficulty_experienced: createReviewDto.difficulty_experienced,
      },
    });
    return {
      message: 'Review created successfully',
      review: {
        id: review.id,
        trail_id: review.trail_id,
        user_id: review.user_id,
        rating: review.rating,
        review_text: review.review_text,
        difficulty_experienced: review.difficulty_experienced,
        created_at: review.created_at,
        updated_at: review.updated_at,
      },
    };
  }

  async updateReview(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
    const existing = await this.prismaService.review.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Review not found');
    }
    const review = await this.prismaService.review.update({
      where: { id },
      data: {
        trail_id: updateReviewDto.trailId,
        user_id: updateReviewDto.userId,
        rating: updateReviewDto.rating,
        review_text: updateReviewDto.comment,
        difficulty_experienced: updateReviewDto.difficulty_experienced,
      },
    });
    return {
      message: 'Review updated successfully',
      review: {
        id: review.id,
        trail_id: review.trail_id,
        user_id: review.user_id,
        rating: review.rating,
        review_text: review.review_text,
        difficulty_experienced: review.difficulty_experienced,
        created_at: review.created_at,
        updated_at: review.updated_at,
      },
    };
  }
  async deleteReview(id: number): Promise<ReviewResponseDto> {
    const existing = await this.prismaService.review.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Review not found');
    }
    const review = await this.prismaService.review.delete({
      where: { id },
    });
    return {
      message: 'Review deleted successfully',
      review: {
        id: review.id,
        trail_id: review.trail_id,
        user_id: review.user_id,
        rating: review.rating,
        review_text: review.review_text,
        difficulty_experienced: review.difficulty_experienced,
        created_at: review.created_at,
        updated_at: review.updated_at,
      },
    };
  }
  async getReviewsByTrail(trailId: number): Promise<ReviewResponseDto[]> {
    const reviews = await this.prismaService.review.findMany({
      where: { trail_id: trailId },
    });
    return reviews.map((review) => ({
      message: 'Review loaded successfully',
      review: {
        id: review.id,
        trail_id: review.trail_id,
        user_id: review.user_id,
        rating: review.rating,
        review_text: review.review_text,
        difficulty_experienced: review.difficulty_experienced,
        created_at: review.created_at,
        updated_at: review.updated_at,
      },
    }));
  }

  async getReview(): Promise<ReviewResponseDto[]> {
    const reviews = await this.prismaService.review.findMany();
    return reviews.map((review) => ({
      message: 'Reviews loaded successfully',
      review: {
        id: review.id,
        trail_id: review.trail_id,
        user_id: review.user_id,
        rating: review.rating,
        review_text: review.review_text,
        difficulty_experienced: review.difficulty_experienced,
        created_at: review.created_at,
        updated_at: review.updated_at,
      },
    }));
  }
}
