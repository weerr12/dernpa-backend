import { Controller, Get } from '@nestjs/common';
import { TrailService } from './trail.service';

@Controller('trail')
export class TrailController {
  constructor(private readonly trailService: TrailService) {
    //
  }

  @Get()
  async getAllTrails() {
    return this.trailService.getAllTrails();
  }
}
