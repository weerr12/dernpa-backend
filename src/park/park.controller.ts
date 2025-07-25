import { Controller, Get, Param } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParksListResponseDto } from './dto/park-response.dto';
import { ParkDetailResponseDto } from './dto/park-detail-response.dto';
import { ParkTrailsResponseDto } from './dto/park-trails-response.dto';
import { ParkEquipmentResponseDto } from './dto/park-equipment-response.dto';

@Controller('park')
export class ParkController {
  constructor(private readonly parkService: ParkService) {}

  // GET /parks - ดูรายการอุทยานทั้งหมด
  // GET /parks/:id - ดูรายละเอียดอุทยาน
  // GET /parks/province/:province - ค้นหาอุทยานตามจังหวัด
  // GET /parks/:id/trails - ดูเส้นทางในอุทยาน
  // GET /parks/:id/equipment - ดูอุปกรณ์ให้เช่าในอุทยาน

  // GET /park - ดูรายการอุทยานทั้งหมด
  @Get()
  async getAllParks(): Promise<ParksListResponseDto> {
    return await this.parkService.getParks();
  }

  // GET /park/:id - ดูรายละเอียดอุทยาน
  @Get(':id')
  async getParkDetail(@Param('id') id: string): Promise<ParkDetailResponseDto> {
    return await this.parkService.getParkDetail(Number(id));
  }

  // GET /park/province/:province - ค้นหาอุทยานตามจังหวัด
  @Get('province/:province')
  async getParksByProvince(
    @Param('province') province: string,
  ): Promise<ParksListResponseDto> {
    return await this.parkService.getParksByProvince(province);
  }

  // GET /park/:id/trails - ดูเส้นทางในอุทยาน
  @Get(':id/trails')
  async getParkTrails(@Param('id') id: string): Promise<ParkTrailsResponseDto> {
    return await this.parkService.getParkTrails(Number(id));
  }

  // GET /park/:id/equipment - ดูอุปกรณ์ให้เช่าในอุทยาน
  @Get(':id/equipment')
  async getParkEquipment(
    @Param('id') id: string,
  ): Promise<ParkEquipmentResponseDto> {
    return await this.parkService.getParkEquipment(Number(id));
  }
}
