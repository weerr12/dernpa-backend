import { Module } from '@nestjs/common';
import { TrailService } from './trail.service';
import { TrailController } from './trail.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TrailController],
  providers: [TrailService, PrismaService],
})
export class TrailModule {}
