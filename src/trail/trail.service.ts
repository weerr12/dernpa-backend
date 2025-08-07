import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrailService {
  constructor(private prisma: PrismaService) {
    //
  }

  async getAllTrails() {
    try {
      const trails = await this.prisma.trail.findMany({
        include: {
          park: {
            select: {
              id: true,
              park_name: true,
              park_type: true,
              location_province: true,
              location_district: true,
              location_subdistrict: true,
            },
          },
          _count: {
            select: {
              reviews: true,
              photos: true,
              favorite_trails: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      });

      return {
        success: true,
        data: trails,
        message: 'Get All Trails successfully',
      };
    } catch (error) {
      console.error('Error fetching trails:', error);
      throw new BadRequestException('Failed to fetch trails');
    }
  }
}
