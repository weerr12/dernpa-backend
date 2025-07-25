import { EquipmentRental } from '@prisma/client';

export class ParkEquipmentResponseDto {
  message: string;
  equipment: EquipmentRental[];
  total: number;
}
