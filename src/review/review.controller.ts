import { Controller } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Body, Post, Put, Delete, Param, Get } from '@nestjs/common';
import { ReviewResponseDto } from './dto/review-response.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // GET /review - ดูรีวิวทั้งหมด
  @Get()
  async getAllReviews(): Promise<ReviewResponseDto[]> {
    return this.reviewService.getReview();
  }
  // POST /review - เขียนรีวิวเส้นทาง
  @Post()
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    return this.reviewService.createReview(createReviewDto);
  }

  // PUT /review/:id - แก้ไขรีวิว
  @Put(':id')
  async updateReview(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewResponseDto> {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  // DELETE /review/:id - ลบรีวิว
  @Delete(':id')
  async deleteReview(@Param('id') id: number): Promise<ReviewResponseDto> {
    return this.reviewService.deleteReview(id);
  }

  // GET /review/trail/:trailId - ดูรีวิวของเส้นทาง
  @Get('trail/:trailId')
  async getReviewsByTrail(
    @Param('trailId') trailId: number,
  ): Promise<ReviewResponseDto[]> {
    return this.reviewService.getReviewsByTrail(trailId);
  }
}
