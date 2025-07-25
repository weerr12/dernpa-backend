import { Module } from '@nestjs/common';
import { DiarieService } from './diarie.service';
import { DiarieController } from './diarie.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DiarieController],
  providers: [DiarieService],
})
export class DiarieModule {}
