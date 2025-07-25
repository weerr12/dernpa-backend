import { IsOptional, IsNumber } from 'class-validator';

export class GuideProfileSearchDto {
  @IsOptional()
  @IsNumber()
  trail_id?: number;

  @IsOptional()
  @IsNumber()
  min_price?: number;

  @IsOptional()
  @IsNumber()
  max_price?: number;

  @IsOptional()
  @IsNumber()
  min_rating?: number;

  @IsOptional()
  @IsNumber()
  max_rating?: number;
}
