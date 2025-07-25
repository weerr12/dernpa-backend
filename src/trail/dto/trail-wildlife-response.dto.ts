import { TrailWildlife } from '@prisma/client';

export class TrailWildlifeResponseDto {
  message: string;
  wildlife: TrailWildlife[];
  total: number;
}
