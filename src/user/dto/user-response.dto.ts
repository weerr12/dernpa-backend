export class UserResponseDto {
  id: number;
  username: string;
  email: string;
  role: string;
  phone?: string;
  profile_picture_url?: string;
  created_at: Date;
}

export class UserProfileResponseDto {
  message: string;
  user: UserResponseDto;
}
