import { TrailFeature } from '@prisma/client';

export class TrailFeatureResponseDto {
  message: string;
  features: TrailFeature[];
  total: number;
}
