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
import { DeleteResponseDto } from './dto/delete-response.dto';
import { CreateParkDto } from './dto/create-park.dto';
import { CreateGuideDto } from './dto/create-guide.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {
    //
  }

  // =========================== Trails ===========================
  @Get('trails')
  async getAllTrails() {
    return this.adminService.getAllTrails();
  }
  @Get('trails/:id')
  async getTrail(@Param('id') id: string): Promise<TrailResponseDto> {
    return this.adminService.getTrailById(Number(id));
  }
  @Post('trails')
  async createTrail(
    @Body() createTrailDto: CreateTrailDto,
  ): Promise<TrailResponseDto> {
    return this.adminService.createTrail(createTrailDto);
  }
  @Put('trails/:id')
  async updateTrail(
    @Param('id') id: string,
    @Body() updateTrailDto: UpdateTrailDto,
  ): Promise<TrailResponseDto> {
    return this.adminService.updateTrail(Number(id), updateTrailDto);
  }
  @Delete('trails/:id')
  async deleteTrail(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.adminService.deleteTrail(Number(id));
  }

  // =========================== Parks ===========================
  @Get('parks')
  async getAllParks() {
    return this.adminService.getAllParks();
  }
  @Get('parks/:id')
  async getPark(@Param('id') id: string) {
    return this.adminService.getParkById(Number(id));
  }
  @Post('parks')
  async createPark(@Body() createParkDto: CreateParkDto) {
    return this.adminService.createPark(createParkDto);
  }
  @Put('parks/:id')
  async updatePark(
    @Param('id') id: string,
    @Body() createParkDto: CreateParkDto,
  ) {
    return this.adminService.updatePark(Number(id), createParkDto);
  }
  @Delete('parks/:id')
  async deletePark(@Param('id') id: string) {
    return this.adminService.deletePark(Number(id));
  }

  // =========================== Reviews ===========================
  @Get('reviews')
  async getReviews() {
    return this.adminService.getReviews();
  }

  // =========================== Users ===========================
  @Get('users')
  async getUsers() {
    return this.adminService.getUsers();
  }

  @Put('users/:id')
  changeUserRole(@Param('id') id: string, @Body('role') role: string) {
    return this.adminService.changeUserRole(Number(id), role);
  }
  // =========================== Guides ===========================
  @Get('guides')
  async getAllGuides() {
    return this.adminService.getAllGuides();
  }
  @Get('guides/:id')
  async getGuide(@Param('id') id: string) {
    return this.adminService.getGuideById(Number(id));
  }
  @Post('guides')
  async createGuide(@Body() createGuideDto: CreateGuideDto) {
    return this.adminService.createGuide(createGuideDto);
  }
  @Put('guides/:id')
  async updateGuide(
    @Param('id') id: string,
    @Body() createGuideDto: CreateGuideDto,
  ) {
    return this.adminService.updateGuide(Number(id), createGuideDto);
  }
  @Delete('guides/:id')
  async deleteGuide(@Param('id') id: string) {
    return this.adminService.deleteGuide(Number(id));
  }
}
