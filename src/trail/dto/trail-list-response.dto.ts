import { Trail } from '@prisma/client';

export class TrailListResponseDto {
  message: string;
  trails: Trail[];
  total: number;
}
