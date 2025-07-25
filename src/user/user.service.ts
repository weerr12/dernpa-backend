import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  UserProfileResponseDto,
  UserResponseDto,
} from './dto/user-response.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { FavoritesResponseDto } from './dto/favorites-response.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number): Promise<UserProfileResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        phone: true,
        profile_picture_url: true,
        created_at: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'Profile retrieved successfully',
      user: user as UserResponseDto,
    };
  }

  async updateProfile(
    userId: number,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfileResponseDto> {
    // ตรวจสอบว่า user มีอยู่จริง
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // ตรวจสอบว่า email ซ้ำกับคนอื่นมั้ย (ถ้ามีการอัปเดต email)
    if (updateUserProfileDto.email) {
      const emailTaken = await this.prisma.user.findFirst({
        where: {
          email: updateUserProfileDto.email,
          NOT: { id: userId }, // ไม่นับตัวเอง
        },
      });

      if (emailTaken) {
        throw new BadRequestException('Email is already in use');
      }
    }

    // อัปเดต user
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserProfileDto,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        phone: true,
        profile_picture_url: true,
        created_at: true,
      },
    });

    return {
      message: 'Profile updated successfully',
      user: updatedUser as UserResponseDto,
    };
  }

  async getFavorites(userId: number): Promise<FavoritesResponseDto> {
    const favorites = await this.prisma.favoriteTrail.findMany({
      where: { user_id: userId },
      include: {
        trail: {
          select: {
            id: true,
            trail_name: true,
            trail_description: true,
            difficulty_level: true,
            length_kilometer: true,
            duration_estimated: true,
            park: {
              select: {
                id: true,
                park_name: true,
                location_province: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      message: 'Load list favorite successfully',
      favorites,
      total: favorites.length,
    };
  }

  async addFavorite(
    userId: number,
    trailId: number,
  ): Promise<FavoritesResponseDto> {
    // ตรวจสอบว่า trail มีอยู่จริง
    const trail = await this.prisma.trail.findUnique({
      where: { id: trailId },
    });
    if (!trail) {
      throw new NotFoundException('Trail not found');
    }

    // ตรวจสอบว่า favorite นี้ซ้ำหรือยัง
    const exists = await this.prisma.favoriteTrail.findUnique({
      where: {
        user_id_trail_id: {
          user_id: userId,
          trail_id: trailId,
        },
      },
    });
    if (exists) {
      throw new BadRequestException('This trail is already in your favorites');
    }

    // เพิ่ม favorite ใหม่
    await this.prisma.favoriteTrail.create({
      data: {
        user_id: userId,
        trail_id: trailId,
        notes: '',
      },
    });

    // return รายการ favorites ล่าสุด
    return this.getFavorites(userId);
  }

  async removeFavorite(
    userId: number,
    trailId: number,
  ): Promise<FavoritesResponseDto> {
    // ตรวจสอบว่า favorite นี้มีอยู่จริง
    const favorite = await this.prisma.favoriteTrail.findUnique({
      where: {
        user_id_trail_id: {
          user_id: userId,
          trail_id: trailId,
        },
      },
    });
    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    // ลบ favorite
    await this.prisma.favoriteTrail.delete({
      where: {
        user_id_trail_id: {
          user_id: userId,
          trail_id: trailId,
        },
      },
    });

    return this.getFavorites(userId);
  }
}
