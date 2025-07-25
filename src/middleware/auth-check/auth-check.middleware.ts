import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AuthCheckMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) { }
  async use(req: any, res: any, next: () => void) {
    try {
      const headerToken = req.headers.authorization;
      if (!headerToken) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const token = headerToken.split(' ')[1];
      // verify token (จะ throw ถ้าไม่ถูกต้อง)
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      // หา user จากฐานข้อมูล
      const user = await this.prismaService.user.findFirst({
        where: { email: decoded.email },
      });
      if (!user) {
        res.status(401).json({
          message: 'User not found',
          error: 'Unauthorized',
          statusCode: 401,
        });
        return;
      }
      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
