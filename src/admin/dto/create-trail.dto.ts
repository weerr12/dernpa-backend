import { IsString, IsNumber, IsInt } from 'class-validator';

export class CreateTrailDto {
  @IsString()
  trail_name: string;

  @IsString()
  trail_description: string;

  @IsString()
  difficulty_level: string; // ง่าย, กลาง, ยาก

  @IsNumber()
  length_kilometer: number;

  @IsInt()
  duration_estimated: number; // นาที

  @IsInt()
  elevation_gain: number;

  @IsInt()
  elevation_max: number;

  @IsString()
  latitude_start: string;

  @IsString()
  longitude_start: string;

  @IsString()
  latitude_end: string;

  @IsString()
  longitude_end: string;

  @IsString()
  best_time_to_visit: string;

  @IsString()
  best_walking_time: string;

  @IsString()
  trail_type: string;

  @IsInt()
  park_id: number;

  // @IsString()
  // park_name: string;
}
