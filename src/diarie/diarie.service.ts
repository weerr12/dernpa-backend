import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DiarieCreateDto } from './dto/diarie-create.dto';
import { DiarieUpdateDto } from './dto/diarie-update.dto';

@Injectable()
export class DiarieService {
  constructor(private prisma: PrismaService) {
    //
  }

  async getMyDiaries(userId: number) {
    try {
      const diaries = await this.prisma.diary.findMany({
        where: { user_id: userId },
        include: {
          trail: {
            select: {
              id: true,
              trail_name: true,
              park: {
                select: {
                  park_name: true,
                  park_type: true,
                  location_province: true,
                  location_district: true,
                  location_subdistrict: true,
                },
              },
            },
          },
        },
        orderBy: {
          visit_date: 'desc',
        },
      });

      return {
        success: true,
        message: 'Diaries loaded successfully',
        data: diaries,
      };
    } catch (error) {
      console.error('Error fetching diaries:', error);
      throw new NotFoundException('Diaries not found for this user');
    }
  }

  async getDiaryById(id: number, userId: number) {
    if (!id) {
      throw new BadRequestException('กรุณาระบุ ID');
    }
    if (!userId) {
      throw new BadRequestException('กรุณาระบุ User ID');
    }
    try {
      const diary = await this.prisma.diary.findFirst({
        where: { id, user_id: userId },
        include: {
          trail: {
            select: {
              id: true,
              trail_name: true,
              difficulty_level: true,
              park: {
                select: {
                  park_name: true,
                  park_type: true,
                  location_province: true,
                  location_district: true,
                  location_subdistrict: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      if (!diary) {
        throw new NotFoundException('Diary not found');
      }
      return {
        success: true,
        message: 'Diary retrieved successfully',
        data: diary,
      };
    } catch (error) {
      console.error('Error fetching diary:', error);
      throw new BadRequestException('Failed to retrieve diary');
    }
  }

  async createDiarie(dto: DiarieCreateDto, userId: number) {
    try {
      const trail = await this.prisma.trail.findUnique({
        where: { id: dto.trail_id },
      });

      if (!trail) {
        throw new NotFoundException('Trail not found');
      }

      const diary = await this.prisma.diary.create({
        data: {
          user_id: userId,
          trail_id: dto.trail_id,
          title: dto.title,
          content: dto.content,
          visit_date: new Date(dto.visit_date),
        },
        include: {
          trail: {
            select: {
              trail_name: true,
              park: {
                select: {
                  park_name: true,
                },
              },
            },
          },
        },
      });

      return {
        success: true,
        message: 'Diary created successfully',
        data: diary,
      };
    } catch (error) {
      console.error('Error creating diary:', error);
      throw new BadRequestException('Error creating diary');
    }
  }

  async updateDiarie(id: number, dto: DiarieUpdateDto, userId: number) {
    try {
      const existingDiary = await this.prisma.diary.findUnique({
        where: { id, user_id: userId },
      });

      if (!existingDiary) {
        throw new NotFoundException('Diary not found');
      }

      const updateData: any = { ...dto };
      if (dto.visit_date) {
        updateData.visit_date = new Date(dto.visit_date);
      }

      const updatedDiary = await this.prisma.diary.update({
        where: { id },
        data: updateData,
        include: {
          trail: {
            select: {
              trail_name: true,
              park: {
                select: {
                  park_name: true,
                  park_type: true,
                  location_province: true,
                  location_district: true,
                  location_subdistrict: true,
                },
              },
            },
          },
        },
      });

      return {
        success: true,
        data: updatedDiary,
        message: 'Diary updated successfully',
      };
    } catch (error) {
      console.error('Error updating diary:', error);
      throw new BadRequestException('Error updating diary');
    }
  }

  async deleteDiarie(id: number, userId: number) {
    try {
      const existingDiary = await this.prisma.diary.findUnique({
        where: { id, user_id: userId },
        select: { id: true, user_id: true, title: true },
      });

      if (!existingDiary) {
        throw new NotFoundException('Diary not found');
      }
      const deletedDiary = await this.prisma.diary.delete({
        where: { id },
      });

      return {
        success: true,
        data: deletedDiary,
        message: 'Diary deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting diary:', error);
      throw new BadRequestException('Error deleting diary');
    }
  }
}
