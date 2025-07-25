import { IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';

export class GuideProfileApplyDto {
  @IsNumber()
  user_id: number;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsNumber()
  experience_years: number;

  @IsNumber()
  price_rate: number;

  @IsBoolean()
  @IsOptional()
  is_available?: boolean;
}
