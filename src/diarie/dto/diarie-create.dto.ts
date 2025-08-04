import { IsString, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class DiarieCreateDto {
  @IsNumber()
  trail_id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  visit_date: Date;
}
