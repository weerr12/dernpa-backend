import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthCheckMiddleware } from '../middleware/auth-check/auth-check.middleware';
import { AdminCheckMiddleware } from '../middleware/admin-check/admin-check.middleware';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer) {
    consumer
      .apply(AuthCheckMiddleware)
      .forRoutes(
        'auth/current-user',
        'auth/current-admin',
        'auth/logout',
        'auth/refresh',
      );
    consumer.apply(AdminCheckMiddleware).forRoutes('auth/current-admin');
  }
}
