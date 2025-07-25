export class ReviewResponseDto {
  message: string;
  review?: {
    id: number;
    trail_id: number;
    user_id: number;
    rating: number;
    review_text?: string | null;
    difficulty_experienced: string;
    created_at: Date;
    updated_at: Date;
  };
}
