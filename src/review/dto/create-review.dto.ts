import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  trailId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  difficulty_experienced: string;
}
