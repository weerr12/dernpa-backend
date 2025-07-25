import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateParkDto {
  @IsOptional()
  @IsInt()
  id: number;
  @IsString()
  park_name: string;

  @IsString()
  park_type: string;

  @IsString()
  location_province: string;

  @IsOptional()
  @IsString()
  location_district?: string;

  @IsOptional()
  @IsString()
  location_subdistrict?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsOptional()
  @IsString()
  emergency_contact?: string;

  @IsOptional()
  @IsString()
  opening_hours?: string;
}
