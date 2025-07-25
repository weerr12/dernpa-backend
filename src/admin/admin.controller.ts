import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { TrailResponseDto } from './dto/trail-response.dto';
import { CreateParkDto } from './dto/create-park.dto';
import { ParkResponseDto } from '../park/dto/park-response.dto';
import { AdminUserListResponseDto } from './dto/admin-user-response.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // POST /admin/trails - เพิ่มเส้นทางใหม่
  @Post('trails')
  async createTrail(
    @Body() createTrailDto: CreateTrailDto,
  ): Promise<TrailResponseDto> {
    return this.adminService.createTrail(createTrailDto);
  }

  // PUT /admin/trails/:id - แก้ไขเส้นทาง
  @Put('trails/:id')
  async updateTrail(
    @Param('id') id: string,
    @Body() updateTrailDto: UpdateTrailDto,
  ): Promise<TrailResponseDto> {
    return this.adminService.updateTrail(Number(id), updateTrailDto);
  }

  // DELETE /admin/trails/:id - ลบเส้นทาง
  @Delete('trails/:id')
  async deleteTrail(@Param('id') id: string): Promise<TrailResponseDto> {
    return this.adminService.deleteTrail(Number(id));
  }

  // POST /admin/parks - เพิ่มอุทยานใหม่
  @Post('parks')
  async createPark(
    @Body() createParkDto: CreateParkDto,
  ): Promise<ParkResponseDto> {
    return this.adminService.createPark(createParkDto);
  }

  // GET /admin/users - จัดการผู้ใช้
  @Get('users')
  async getUsers(): Promise<AdminUserListResponseDto> {
    return this.adminService.getUsers();
  }
}
