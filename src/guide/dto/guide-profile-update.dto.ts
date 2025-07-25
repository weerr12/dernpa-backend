import { IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';

export class GuideProfileUpdateDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsNumber()
  @IsOptional()
  experience_years?: number;

  @IsNumber()
  @IsOptional()
  price_rate?: number;

  @IsBoolean()
  @IsOptional()
  is_available?: boolean;
}
