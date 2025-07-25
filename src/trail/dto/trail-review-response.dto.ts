import { Review } from '@prisma/client';

export class TrailReviewResponseDto {
  message: string;
  reviews: Review[];
  total: number;
}
