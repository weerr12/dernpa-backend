import { DiarieResponseDto } from './diarie-response.dto';

export class DiarieListResponseDto {
  message: string;
  diaries: DiarieResponseDto[];
  total: number;
}
