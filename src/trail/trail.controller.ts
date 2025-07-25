import { Controller, Get, Query, Param } from '@nestjs/common';
import { TrailService } from './trail.service';
import { TrailListResponseDto } from './dto/trail-list-response.dto';
import { TrailDetailResponseDto } from './dto/trail-detail-response.dto';
import { TrailFeatureResponseDto } from './dto/trail-feature-response.dto';
import { TrailWildlifeResponseDto } from './dto/trail-wildlife-response.dto';
import { TrailSafetyResponseDto } from './dto/trail-safety-response.dto';
import { TrailReviewResponseDto } from './dto/trail-review-response.dto';
import { TrailPhotoResponseDto } from './dto/trail-photo-response.dto';

@Controller('trail')
export class TrailController {
  constructor(private readonly trailService: TrailService) {}

  // GET /trail - ดูรายการเส้นทางทั้งหมด (filter ตาม difficulty, park, etc.)
  @Get()
  async getTrails(
    @Query('difficulty') difficulty?: string,
    @Query('park') park?: string,
  ): Promise<TrailListResponseDto> {
    return await this.trailService.getTrails({ difficulty, park });
  }

  // GET /trail/:id - ดูรายละเอียดเส้นทาง
  @Get(':id')
  async getTrailDetail(
    @Param('id') id: string,
  ): Promise<TrailDetailResponseDto> {
    return await this.trailService.getTrailDetail(Number(id));
  }

  // // GET /trail/search - ค้นหาเส้นทาง (ตามชื่อ, จังหวัด, ความยาก)
  // @Get('search')
  // async searchTrails(
  //   @Query('name') name?: string,
  //   @Query('province') province?: string,
  //   @Query('difficulty') difficulty?: string,
  // ): Promise<TrailListResponseDto> {
  //   return await this.trailService.searchTrails({ name, province, difficulty });
  // }

  // GET /trail/:id/features - ดูจุดเด่นของเส้นทาง
  @Get(':id/features')
  async getTrailFeatures(
    @Param('id') id: string,
  ): Promise<TrailFeatureResponseDto> {
    return await this.trailService.getTrailFeatures(Number(id));
  }

  // GET /trail/:id/wildlife - ดูสัตว์ป่าที่พบได้
  @Get(':id/wildlife')
  async getTrailWildlife(
    @Param('id') id: string,
  ): Promise<TrailWildlifeResponseDto> {
    return await this.trailService.getTrailWildlife(Number(id));
  }

  // GET /trail/:id/safety - ดูข้อมูลความปลอดภัย
  @Get(':id/safety')
  async getTrailSafety(
    @Param('id') id: string,
  ): Promise<TrailSafetyResponseDto> {
    return await this.trailService.getTrailSafety(Number(id));
  }

  // GET /trail/:id/reviews - ดูรีวิวเส้นทาง
  @Get(':id/reviews')
  async getTrailReviews(
    @Param('id') id: string,
  ): Promise<TrailReviewResponseDto> {
    return await this.trailService.getTrailReviews(Number(id));
  }

  // GET /trail/:id/photos - ดูรูปภาพเส้นทาง
  @Get(':id/photos')
  async getTrailPhotos(
    @Param('id') id: string,
  ): Promise<TrailPhotoResponseDto> {
    return await this.trailService.getTrailPhotos(Number(id));
  }
}
