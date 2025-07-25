import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TrailListResponseDto } from './dto/trail-list-response.dto';
import { TrailDetailResponseDto } from './dto/trail-detail-response.dto';
import { TrailFeatureResponseDto } from './dto/trail-feature-response.dto';
import { TrailWildlifeResponseDto } from './dto/trail-wildlife-response.dto';
import { TrailSafetyResponseDto } from './dto/trail-safety-response.dto';
import { TrailReviewResponseDto } from './dto/trail-review-response.dto';
import { TrailPhotoResponseDto } from './dto/trail-photo-response.dto';

@Injectable()
export class TrailService {
  constructor(private prisma: PrismaService) {}

  async getTrails(filter: {
    difficulty?: string;
    park?: string;
  }): Promise<TrailListResponseDto> {
    const where: any = {};
    if (filter.difficulty) where.difficulty_level = filter.difficulty;
    if (filter.park) where.park_id = Number(filter.park);

    const trails = await this.prisma.trail.findMany({ where });
    if (!trails) {
      return {
        message: 'No trails found',
        trails: [],
        total: 0,
      };
    }
    return {
      message: 'Trails loaded successfully',
      trails,
      total: trails.length,
    };
  }

  async getTrailDetail(id: number): Promise<TrailDetailResponseDto> {
    const trail = await this.prisma.trail.findUnique({ where: { id: id } });
    if (!trail) {
      return {
        message: 'Trail not found',
        trail: undefined,
      };
    }
    return {
      message: trail ? 'Trail detail loaded successfully' : 'Trail not found',
      trail: trail ?? undefined,
    };
  }

  // async searchTrails(filter: {
  //   name?: string;
  //   province?: string;
  //   difficulty?: string;
  // }): Promise<TrailListResponseDto> {
  //   const where: any = {};
  //   if (filter.name)
  //     where.trail_name = { contains: filter.name, mode: 'insensitive' };
  //   if (filter.difficulty) where.difficulty_level = filter.difficulty;
  //   if (filter.province) {
  //     where.park = { location_province: { equals: filter.province } };
  //   }
  //   const trails = await this.prisma.trail.findMany({
  //     where,
  //     include: filter.province ? { park: true } : undefined,
  //   });
  //   return {
  //     message: 'Trails search loaded successfully',
  //     trails,
  //     total: trails.length,
  //   };
  // }

  async getTrailFeatures(id: number): Promise<TrailFeatureResponseDto> {
    const features = await this.prisma.trailFeature.findMany({
      where: { trail_id: id },
    });
    if (!features) {
      return {
        message: 'No features found for this trail',
        features: [],
        total: 0,
      };
    }
    return {
      message: 'Trail features loaded successfully',
      features,
      total: features.length,
    };
  }

  async getTrailWildlife(id: number): Promise<TrailWildlifeResponseDto> {
    const wildlife = await this.prisma.trailWildlife.findMany({
      where: { trail_id: id },
    });
    if (!wildlife) {
      return {
        message: 'No wildlife found for this trail',
        wildlife: [],
        total: 0,
      };
    }
    return {
      message: 'Trail wildlife loaded successfully',
      wildlife,
      total: wildlife.length,
    };
  }

  async getTrailSafety(id: number): Promise<TrailSafetyResponseDto> {
    const safety = await this.prisma.safetyInfo.findMany({
      where: { trail_id: id },
    });
    if (!safety) {
      return {
        message: 'No safety information found for this trail',
        safety: [],
        total: 0,
      };
    }
    return {
      message: 'Trail safety info loaded successfully',
      safety,
      total: safety.length,
    };
  }

  async getTrailReviews(id: number): Promise<TrailReviewResponseDto> {
    const reviews = await this.prisma.review.findMany({
      where: { trail_id: id },
    });
    if (!reviews) {
      return {
        message: 'No reviews found for this trail',
        reviews: [],
        total: 0,
      };
    }
    return {
      message: 'Trail reviews loaded successfully',
      reviews,
      total: reviews.length,
    };
  }

  async getTrailPhotos(id: number): Promise<TrailPhotoResponseDto> {
    const photos = await this.prisma.photo.findMany({
      where: { trail_id: id },
    });
    if (!photos) {
      return {
        message: 'No photos found for this trail',
        photos: [],
        total: 0,
      };
    }
    return {
      message: 'Trail photos loaded successfully',
      photos,
      total: photos.length,
    };
  }
}
