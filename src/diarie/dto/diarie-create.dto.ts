import { IsNumber, IsString, IsDateString } from 'class-validator';

export class DiarieCreateDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  trail_id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDateString()
  visit_date: Date;
}
