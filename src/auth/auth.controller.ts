import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    // Constructor logic if needed
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);
    // เก็บ access token และ refresh token ใน HTTP-only cookie
    res.cookie('token', result.access_token, {
      httpOnly: true,
    });
    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
    });

    return {
      message: 'Login successful',
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      payload: result.payload,
    };
  }

  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Body('refresh_token') refreshToken?: string,
  ) {
    // รับ refresh token จาก cookie หรือ body
    const token = refreshToken || res.req.cookies['refresh_token'];
    if (!token) {
      return { message: 'No refresh token provided' };
    }
    const result = await this.authService.refreshToken(token);
    // set access token ใหม่ใน cookie
    res.cookie('token', result.access_token, { httpOnly: true });
    return {
      message: 'Token refreshed',
      access_token: result.access_token,
      user: result.user,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
    });
    return {
      message: 'Logged out successfully',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('current-user')
  getCurrentUser(@Body('email') email: string) {
    return this.authService.getCurrentUser(email);
  }

  @Post('current-admin')
  getCurrentAdmin(@Body('email') email: string) {
    return this.authService.getCurrentUser(email);
  }
}
