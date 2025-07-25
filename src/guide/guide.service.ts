import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GuideProfileResponseDto } from './dto/guide-profile-response.dto';
import { GuideProfileListResponseDto } from './dto/guide-profile-list-response.dto';
import { GuideProfileApplyDto } from './dto/guide-profile-apply.dto';
import { GuideProfileUpdateDto } from './dto/guide-profile-update.dto';

@Injectable()
export class GuideService {
  constructor(private prisma: PrismaService) {}

  async getGuides(): Promise<GuideProfileListResponseDto> {
    const guides = await this.prisma.guideProfile.findMany();
    return {
      message: 'Guides loaded successfully',
      guides: guides.map((g) => ({
        id: g.id,
        user_id: g.user_id,
        bio: g.bio ?? undefined,
        experience_years: g.experience_years,
        average_rating: g.average_rating ? Number(g.average_rating) : undefined,
        total_bookings: g.total_bookings,
        is_available: g.is_available,
        price_rate: g.price_rate ? Number(g.price_rate) : 0,
        created_at: g.created_at,
        updated_at: g.updated_at,
      })),
      total: guides.length,
    };
  }

  async getGuideById(id: number): Promise<GuideProfileResponseDto> {
    const guide = await this.prisma.guideProfile.findUnique({
      where: { id: Number(id) },
    });
    if (!guide) {
      throw new NotFoundException('Guide not found');
    }
    return {
      id: guide.id,
      user_id: guide.user_id,
      bio: guide.bio ?? undefined,
      experience_years: guide.experience_years,
      average_rating: guide.average_rating
        ? Number(guide.average_rating)
        : undefined,
      total_bookings: guide.total_bookings,
      is_available: guide.is_available,
      price_rate: guide.price_rate ? Number(guide.price_rate) : 0,
      created_at: guide.created_at,
      updated_at: guide.updated_at,
    };
  }

  async applyGuide(
    data: GuideProfileApplyDto,
  ): Promise<GuideProfileResponseDto> {
    const existingGuide = await this.prisma.guideProfile.findFirst({
      where: { user_id: data.user_id },
    });
    if (existingGuide) {
      throw new NotFoundException('Guide profile already exists for this user');
    }
    const guide = await this.prisma.guideProfile.create({
      data,
    });
    return {
      id: guide.id,
      user_id: guide.user_id,
      bio: guide.bio ?? undefined,
      experience_years: guide.experience_years,
      average_rating: guide.average_rating
        ? Number(guide.average_rating)
        : undefined,
      total_bookings: guide.total_bookings,
      is_available: guide.is_available,
      price_rate: guide.price_rate ? Number(guide.price_rate) : 0,
      created_at: guide.created_at,
      updated_at: guide.updated_at,
    };
  }

  async updateGuideProfile(
    data: GuideProfileUpdateDto,
  ): Promise<GuideProfileResponseDto> {
    const guide = await this.prisma.guideProfile.update({
      where: { id: data.id },
      data,
    });
    return {
      id: guide.id,
      user_id: guide.user_id,
      bio: guide.bio ?? undefined,
      experience_years: guide.experience_years,
      average_rating: guide.average_rating
        ? Number(guide.average_rating)
        : undefined,
      total_bookings: guide.total_bookings,
      is_available: guide.is_available,
      price_rate: guide.price_rate ? Number(guide.price_rate) : 0,
      created_at: guide.created_at,
      updated_at: guide.updated_at,
    };
  }

  // async searchGuides(
  //   filter: GuideProfileSearchDto,
  // ): Promise<GuideProfileListResponseDto> {
  //   const existingGuide = await this.prisma.guideProfile.findFirst({
  //     where: { id: filter.trail_id },
  //   });
  //   if (!existingGuide) {
  //     throw new NotFoundException('No guides found for the given criteria');
  //   }

  //   const where: any = {};
  //   if (filter.trail_id) where.trail = { some: { id: filter.trail_id } };
  //   if (filter.min_price) where.price_rate = { gte: filter.min_price };
  //   if (filter.max_price) where.price_rate = { lte: filter.max_price };
  //   if (filter.min_rating) where.average_rating = { gte: filter.min_rating };
  //   if (filter.max_rating) where.average_rating = { lte: filter.max_rating };
  //   const guides = await this.prisma.guideProfile.findMany({ where });
  //   return {
  //     message: 'Guides search loaded successfully',
  //     guides: guides.map((g) => ({
  //       id: g.id,
  //       user_id: g.user_id,
  //       bio: g.bio ?? undefined,
  //       experience_years: g.experience_years,
  //       average_rating: g.average_rating ? Number(g.average_rating) : undefined,
  //       total_bookings: g.total_bookings,
  //       is_available: g.is_available,
  //       price_rate: g.price_rate ? Number(g.price_rate) : 0,
  //       created_at: g.created_at,
  //       updated_at: g.updated_at,
  //     })),
  //     total: guides.length,
  //   };
  // }
}
