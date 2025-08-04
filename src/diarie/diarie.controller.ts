import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { DiarieService } from './diarie.service';
import { DiarieCreateDto } from './dto/diarie-create.dto';
import { DiarieUpdateDto } from './dto/diarie-update.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('diaries')
@UseGuards(AuthGuard('jwt'))
export class DiarieController {
  constructor(private readonly diarieService: DiarieService) {
    //
  }

  @Get()
  async getMyDiaries(@Request() req) {
    return this.diarieService.getMyDiaries(Number(req.user.id));
  }

  @Get(':id')
  async getDiaryById(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.diarieService.getDiaryById(id, Number(req.user.id));
  }

  @Post()
  async createDiarie(@Body() createDiarieDto: DiarieCreateDto, @Request() req) {
    return this.diarieService.createDiarie(
      createDiarieDto,
      Number(req.user.id),
    );
  }

  @Put(':id')
  async updateDiarie(
    @Param('id') id: string,
    @Body() updateDiarieDto: DiarieUpdateDto,
    @Request() req,
  ) {
    return this.diarieService.updateDiarie(
      Number(id),
      updateDiarieDto,
      Number(req.user.id),
    );
  }

  @Delete(':id')
  async deleteDiarie(@Param('id') id: string, @Request() req) {
    return this.diarieService.deleteDiarie(Number(id), Number(req.user.id));
  }
}
