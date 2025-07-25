import { Body, Controller, Get, Param } from '@nestjs/common';
import { GuideService } from './guide.service';
import { Post, Put } from '@nestjs/common';
import { GuideProfileApplyDto } from './dto/guide-profile-apply.dto';
import { GuideProfileUpdateDto } from './dto/guide-profile-update.dto';

@Controller('guide')
export class GuideController {
  constructor(private readonly guideService: GuideService) {
    // GET /guide - ดูรายการไกด์
    // GET /guide/:id - ดูข้อมูลไกด์
    // POST /guide/apply - สมัครเป็นไกด์ ( optional )
    // PUT /guide/profile - แก้ไขข้อมูลไกด์ ( optional )
    // GET /guide/search - ค้นหาไกด์ (ตามเส้นทาง, ราคา, rating)
  }

  @Get()
  async getGuides() {
    return this.guideService.getGuides();
  }

  @Get(':id')
  async getGuideById(@Param('id') id: number) {
    return this.guideService.getGuideById(Number(id));
  }

  @Post('apply')
  async applyGuide(@Body() dto: GuideProfileApplyDto) {
    return this.guideService.applyGuide(dto);
  }

  @Put('profile')
  async updateGuideProfile(@Body() dto: GuideProfileUpdateDto) {
    return this.guideService.updateGuideProfile(dto);
  }

  // @Get('search')
  // async searchGuides(@Query() query: GuideProfileSearchDto) {
  //   return this.guideService.searchGuides(query);
  // }
}
