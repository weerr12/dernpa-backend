import { Photo } from '@prisma/client';

export class TrailPhotoResponseDto {
  message: string;
  photos: Photo[];
  total: number;
}
