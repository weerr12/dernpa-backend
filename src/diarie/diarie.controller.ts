import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { DiarieService } from './diarie.service';
import { DiarieCreateDto } from './dto/diarie-create.dto';
import { DiarieUpdateDto } from './dto/diarie-update.dto';

@Controller('diarie')
export class DiarieController {
  constructor(private readonly diarieService: DiarieService) {}

  // GET /diarie?user_id=xx - ดูไดอารี่ของตัวเอง
  @Get()
  async getMyDiaries(@Query('user_id') user_id: number) {
    return this.diarieService.getMyDiaries(Number(user_id));
  }

  // POST /diarie - สร้างไดอารี่ใหม่
  @Post()
  async createDiarie(@Body() dto: DiarieCreateDto) {
    return this.diarieService.createDiarie(dto);
  }

  // GET /diarie/:id - ดูไดอารี่
  @Get(':id')
  async getDiarieById(@Param('id') id: number) {
    return this.diarieService.getDiarieById(Number(id));
  }

  // PUT /diarie/:id - แก้ไขไดอารี่
  @Put(':id')
  async updateDiarie(@Param('id') id: number, @Body() dto: DiarieUpdateDto) {
    return this.diarieService.updateDiarie(Number(id), dto);
  }

  // DELETE /diarie/:id - ลบไดอารี่
  @Delete(':id')
  async deleteDiarie(@Param('id') id: number) {
    return this.diarieService.deleteDiarie(Number(id));
  }

  // GET /diarie/trail/:trailId - ดูไดอารี่ของเส้นทาง
  @Get('trail/:trailId')
  async getDiariesByTrail(@Param('trailId') trailId: number) {
    return this.diarieService.getDiariesByTrail(Number(trailId));
  }
}
