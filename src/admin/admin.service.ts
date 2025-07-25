import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { TrailResponseDto } from './dto/trail-response.dto';
import { CreateParkDto } from './dto/create-park.dto';
import { ParkResponseDto } from '../park/dto/park-response.dto';
import { AdminUserListResponseDto } from './dto/admin-user-response.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) { }

  async createTrail(createTrailDto: CreateTrailDto): Promise<TrailResponseDto> {
    // ตรวจสอบ park_id ว่ามีจริง
    const park = await this.prisma.park.findUnique({
      where: { id: createTrailDto.park_id },
    });
    if (!park) {
      throw new BadRequestException('Invalid park_id');
    }

    // สร้าง trail ใหม่
    const trail = await this.prisma.trail.create({
      data: { ...createTrailDto },
    });
    return { message: 'Trail created successfully', trail };
  }

  async updateTrail(
    id: number,
    updateTrailDto: UpdateTrailDto,
  ): Promise<TrailResponseDto> {
    // ตรวจสอบว่า trail มีอยู่จริง
    const trail = await this.prisma.trail.findUnique({ where: { id } });
    if (!trail) {
      throw new NotFoundException('Trail not found');
    }
    // อัปเดต trail
    const updatedTrail = await this.prisma.trail.update({
      where: { id },
      // ใช้ spread operator เพื่ออัปเดตข้อมูล
      data: { ...updateTrailDto },
    });
    return { message: 'Trail updated successfully', trail: updatedTrail };
  }

  async deleteTrail(id: number): Promise<TrailResponseDto> {
    // ตรวจสอบว่า trail มีอยู่จริง
    const trail = await this.prisma.trail.findUnique({ where: { id } });
    if (!trail) {
      throw new NotFoundException('Trail not found');
    }
    // ลบ trail
    await this.prisma.trail.delete({ where: { id } });
    return { message: 'Trail deleted successfully', trail };
  }

  async createPark(createParkDto: CreateParkDto): Promise<ParkResponseDto> {
    // สร้าง park ใหม่
    const {
      id,
      park_name,
      park_type,
      location_province,
      location_district,
      location_subdistrict,
      description,
      latitude,
      longitude,
      emergency_contact,
      opening_hours,
    } = createParkDto;
    const park = await this.prisma.park.create({ data: { ...createParkDto } });
    return {
      id: id,
      park_name: park_name,
      park_type: park_type,
      location_province: location_province,
      location_district: location_district ?? undefined,
      location_subdistrict: location_subdistrict ?? undefined,
      description: description ?? undefined,
      latitude: latitude,
      longitude: longitude,
      emergency_contact: emergency_contact ?? undefined,
      opening_hours: opening_hours ?? undefined,
      created_at: park.created_at,
    };
  }

  async getUsers(): Promise<AdminUserListResponseDto> {
    const users = await this.prisma.user.findMany({
      orderBy: { created_at: 'desc' },
    });
    return {
      message: 'Users loaded successfully',
      users: users as UserResponseDto[],
      total: users.length,
    };
  }
}
