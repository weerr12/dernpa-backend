import { Park } from '@prisma/client';

export class ParkListResponseDto {
  success: boolean;
  data: Park[];
  message: string;
}
