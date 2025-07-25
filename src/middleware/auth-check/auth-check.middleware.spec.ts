import { AuthCheckMiddleware } from './auth-check.middleware';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthCheckMiddleware', () => {
  it('should be defined', () => {
    const jwtService = {} as JwtService;
    const prismaService = {} as PrismaService;
    expect(new AuthCheckMiddleware(jwtService, prismaService)).toBeDefined();
  });
});
