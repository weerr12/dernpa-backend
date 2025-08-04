import {
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  IsPositive,
  IsArray,
} from 'class-validator';

export class CreateGuideDto {
  @IsInt()
  user_id: number;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  experience_years?: number = 0;

  @IsNumber()
  @IsOptional()
  average_rating?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  total_bookings?: number = 0;

  @IsBoolean()
  @IsOptional()
  is_available?: boolean = true;

  @IsNumber()
  @IsPositive()
  price_rate: number;

  @IsOptional()
  @IsPositive({ each: true })
  @IsArray()
  trail_ids?: number[];
}
