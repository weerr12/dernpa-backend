import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    //
  }

  async signup(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    if (!password) {
      throw new BadRequestException('Password is required');
    }
    // เช็คว่ามี email นี้อยู่ใน DB มั้ย
    const emailInUse = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (emailInUse) {
      throw new BadRequestException('Email is already in use');
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });
    return { message: 'User created successfully' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // สร้าง payload สำหรับ JWT
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // สร้าง access token และ refresh token
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });

    const refresh_token = this.jwtService.sign(
      { sub: user.id },
      {
        expiresIn: '1d',
        secret: process.env.REFRESH_TOKEN_SECRET,
      },
    );

    return {
      message: 'Login successful',
      access_token,
      refresh_token,
      payload,
    };
  }

  async refreshToken(refreshToken: string) {
    // ตรวจสอบ refresh token และออก access token ใหม่ (ตัวอย่าง logic)
    // ปกติควร verify refresh token, หา user, แล้วออก access token ใหม่
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });
    if (!user) throw new Error('User not found');
    const access_token = this.jwtService.sign(
      { id: user.id, username: user.username, role: user.role },
      { expiresIn: '1h', secret: process.env.JWT_SECRET },
    );
    return { access_token, user };
  }

  async getCurrentUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
