import { Trail } from '@prisma/client';

export class ParkTrailsResponseDto {
  message: string;
  trails: Trail[];
  total: number;
}
