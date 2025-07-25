import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ParksListResponseDto, ParkResponseDto } from './dto/park-response.dto';
import { ParkDetailResponseDto } from './dto/park-detail-response.dto';
import { ParkTrailsResponseDto } from './dto/park-trails-response.dto';
import { ParkEquipmentResponseDto } from './dto/park-equipment-response.dto';

@Injectable()
export class ParkService {
  constructor(private prisma: PrismaService) {}

  async getParks(): Promise<ParksListResponseDto> {
    const parks = await this.prisma.park.findMany({
      orderBy: { park_name: 'asc' },
    });
    if (!parks) {
      return { message: 'No parks found', parks: [], total: 0 };
    }
    return {
      message: 'Parks loaded successfully',
      parks: parks as ParkResponseDto[],
      total: parks.length,
    };
  }

  async getParkDetail(id: number): Promise<ParkDetailResponseDto> {
    // ตรวจสอบว่า park มีอยู่จริง
    const park = await this.prisma.park.findUnique({ where: { id } });
    if (!park) {
      return { message: 'Park not found', park: undefined };
    }

    // ดึงเส้นทางในอุทยาน
    const trails = await this.prisma.trail.findMany({ where: { park_id: id } });
    return {
      message: 'Park detail loaded successfully',
      park: park as ParkResponseDto,
      trails,
    };
  }

  async getParksByProvince(province: string): Promise<ParksListResponseDto> {
    // ตรวจสอบว่าจังหวัด มีอุทยานหรือไม่
    const parks = await this.prisma.park.findMany({
      where: { location_province: province },
      orderBy: { park_name: 'asc' },
    });
    if (!parks) {
      return {
        message: 'No parks found in this province',
        parks: [],
        total: 0,
      };
    }
    return {
      message: 'Parks by province loaded successfully',
      parks: parks as ParkResponseDto[],
      total: parks.length,
    };
  }

  async getParkTrails(id: number): Promise<ParkTrailsResponseDto> {
    const trails = await this.prisma.trail.findMany({ where: { park_id: id } });
    return {
      message: 'Trails in park loaded successfully',
      trails,
      total: trails.length,
    };
  }

  async getParkEquipment(id: number): Promise<ParkEquipmentResponseDto> {
    const equipment = await this.prisma.equipmentRental.findMany({
      where: { park_id: id },
    });
    return {
      message: 'Equipment in park loaded successfully',
      equipment,
      total: equipment.length,
    };
  }
}
