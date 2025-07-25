import { Optional } from '@nestjs/common';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateReviewDto {
  @IsNumber()
  trailId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  @Optional()
  rating?: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  difficulty_experienced: string;
}
