import {
  Controller,
  Get,
  Put,
  UseGuards,
  Request,
  Body,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserProfileResponseDto } from './dto/user-response.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { FavoritesResponseDto } from './dto/favorites-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<UserProfileResponseDto> {
    return await this.userService.getProfile(Number(req.user.id));
  }

  //แก้ไขโปรไฟล์
  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfileResponseDto> {
    return await this.userService.updateProfile(
      Number(req.user.id),
      updateUserProfileDto,
    );
  }

  // อัปโหลดรูปโปรไฟล์
  // @Post('upload-avatar')

  // ดูเส้นทางที่ชื่นชอบ
  @Get('favorites')
  @UseGuards(JwtAuthGuard) // ต้อง login ก่อน
  // Promise<FavoritesResponseDto> -> type ของค่าที่ funct async จะ return
  async getFavorites(@Request() req): Promise<FavoritesResponseDto> {
    return await this.userService.getFavorites(Number(req.user.id));
  }

  // POST /user/favorites/:trailId - เพิ่มเส้นทางที่ชื่นชอบ
  @Post('favorites/:trailId')
  @UseGuards(JwtAuthGuard)
  async addFavorite(
    @Request() req,
    @Param('trailId') trailId: string,
  ): Promise<FavoritesResponseDto> {
    return await this.userService.addFavorite(
      Number(req.user.id),
      Number(trailId),
    );
  }

  @Delete('favorites/:trailId')
  @UseGuards(JwtAuthGuard)
  async removeFavorite(
    @Request() req,
    @Param('trailId') trailId: string,
  ): Promise<FavoritesResponseDto> {
    return await this.userService.removeFavorite(
      Number(req.user.id),
      Number(trailId),
    );
  }
}
