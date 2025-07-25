import { GuideProfileResponseDto } from './guide-profile-response.dto';

export class GuideProfileListResponseDto {
  message: string;
  guides: GuideProfileResponseDto[];
  total: number;
}
