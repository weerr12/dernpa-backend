import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
    //
  }

  async getProfile(userId: number) {
    try {
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
        success: true,
        message: 'Profile retrieved successfully',
        data: user,
      };
    } catch (error) {
      console.log('Error retrieving user profile:', error);
      throw new BadRequestException('Failed to retrieve profile');
    }
  }

  async getProfileById(id: number, userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id, NOT: { id: userId } },
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
        success: true,
        message: 'Profile retrieved successfully',
        data: user,
      };
    } catch (error) {
      console.log('Error retrieving user profile by ID:', error);
      throw new NotFoundException('User not found');
    }
  }
  async updateProfile(
    userId: number,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    try {
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
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      console.log('Error updating user profile:', error);
      throw new BadRequestException('Failed to update profile');
    }
  }
}
