import { ParkResponseDto } from './park-response.dto';
import { Trail } from '@prisma/client';

export class ParkDetailResponseDto {
  message: string;
  park?: ParkResponseDto;
  trails?: Trail[];
}
