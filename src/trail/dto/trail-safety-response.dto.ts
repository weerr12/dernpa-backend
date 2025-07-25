import { SafetyInfo } from '@prisma/client';

export class TrailSafetyResponseDto {
  message: string;
  safety: SafetyInfo[];
  total: number;
}
