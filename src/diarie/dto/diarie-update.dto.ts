import { IsString, IsDateString, IsOptional } from 'class-validator';

export class DiarieUpdateDto {
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
