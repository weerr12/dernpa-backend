import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DiarieResponseDto } from './dto/diarie-response.dto';
import { DiarieListResponseDto } from './dto/diarie-list-response.dto';
import { DiarieCreateDto } from './dto/diarie-create.dto';
import { DiarieUpdateDto } from './dto/diarie-update.dto';

@Injectable()
export class DiarieService {
  constructor(private prisma: PrismaService) {}

  async getMyDiaries(user_id: number): Promise<DiarieListResponseDto> {
    const diaries = await this.prisma.diary.findMany({ where: { user_id } });
    return {
      message: 'Diaries loaded successfully',
      diaries,
      total: diaries.length,
    };
  }

  async createDiarie(dto: DiarieCreateDto): Promise<DiarieResponseDto> {
    const existingDiary = await this.prisma.diary.findFirst({
      where: { user_id: dto.user_id, trail_id: dto.trail_id },
    });
    if (existingDiary) {
      throw new NotFoundException('Diary for this trail already exists');
    }
    const diary = await this.prisma.diary.create({
      data: {
        ...dto,
        visit_date: new Date(dto.visit_date).toISOString(),
      },
    });
    return diary;
  }

  async getDiarieById(
    id: number,
  ): Promise<DiarieResponseDto | { message: string }> {
    const diary = await this.prisma.diary.findUnique({ where: { id } });
    if (!diary) {
      return { message: 'Diary not found' };
    }
    return diary;
  }

  async updateDiarie(
    id: number,
    dto: DiarieUpdateDto,
  ): Promise<DiarieResponseDto> {
    return await this.prisma.diary.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async deleteDiarie(id: number): Promise<DiarieResponseDto> {
    return await this.prisma.diary.delete({ where: { id } });
  }

  async getDiariesByTrail(trail_id: number): Promise<DiarieListResponseDto> {
    const diaries = await this.prisma.diary.findMany({ where: { trail_id } });
    return {
      message: 'Diaries loaded successfully',
      diaries,
      total: diaries.length,
    };
  }
}
