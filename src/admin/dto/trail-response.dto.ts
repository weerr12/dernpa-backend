import { Trail } from '@prisma/client';

export class TrailResponseDto {
  message: string;
  trail: Trail;
}
