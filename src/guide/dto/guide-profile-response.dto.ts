export class GuideProfileResponseDto {
  id?: number;
  user_id?: number;
  bio?: string;
  experience_years: number;
  average_rating?: number;
  total_bookings: number;
  is_available: boolean;
  price_rate: number;
  created_at: Date;
  updated_at: Date;
}
