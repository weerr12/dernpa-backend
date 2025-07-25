import { Decimal } from '@prisma/client/runtime/library';

export class FavoriteTrailDto {
  id: number;
  user_id: number;
  trail_id: number;
  notes: string;
  created_at: Date;
  trail: {
    id: number;
    trail_name: string;
    trail_description: string;
    difficulty_level: string;
    length_kilometer: Decimal;
    duration_estimated: number;
    park: {
      id: number;
      park_name: string;
      location_province: string;
    };
  };
}

export class FavoritesResponseDto {
  message: string;
  favorites: FavoriteTrailDto[];
  total: number;
}
