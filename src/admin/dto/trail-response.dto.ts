import { Trail } from '@prisma/client';

export class TrailResponseDto {
  success: boolean;
  data: Trail;
  message: string;
}
