import { Trail } from '@prisma/client';

export class TrailDetailResponseDto {
  message: string;
  trail?: Trail;
}
