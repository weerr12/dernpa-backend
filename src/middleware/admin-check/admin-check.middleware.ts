import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AdminCheckMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) { }
  async use(req: any, res: any, next: () => void) {
    try {
      const { email } = req.user;
      const adminUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!adminUser || adminUser.role !== 'admin') {
        res.status(403).json({ message: 'Access Denied: Admin Only' });
        return;
      }
      next();
    } catch (error) {
      console.error('Admin check error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
