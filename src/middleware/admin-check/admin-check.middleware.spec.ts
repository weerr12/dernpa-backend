import { AdminCheckMiddleware } from './admin-check.middleware';

import { PrismaService } from '../../prisma.service';

describe('AdminCheckMiddleware', () => {
  it('should be defined', () => {
    const prismaService = {} as PrismaService; // mock or stub as needed
    expect(new AdminCheckMiddleware(prismaService)).toBeDefined();
  });
});
