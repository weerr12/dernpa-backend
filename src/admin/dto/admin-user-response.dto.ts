import { UserResponseDto } from '../../user/dto/user-response.dto';

export class AdminUserListResponseDto {
  message: string;
  users: UserResponseDto[];
  total: number;
}
