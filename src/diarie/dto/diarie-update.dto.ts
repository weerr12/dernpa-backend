import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class DiarieUpdateDto {
  @IsNumber()
  trail_id: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDateString()
  visit_date?: Date;
}
