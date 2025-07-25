import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { ParkModule } from './park/park.module';
import { TrailModule } from './trail/trail.module';
import { AdminModule } from './admin/admin.module';
import { ReviewModule } from './review/review.module';
import { GuideModule } from './guide/guide.module';
import { DiarieModule } from './diarie/diarie.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    UserModule,
    ParkModule,
    TrailModule,
    AdminModule,
    ReviewModule,
    GuideModule,
    DiarieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
