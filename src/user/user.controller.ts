import {
  Controller,
  Get,
  Put,
  UseGuards,
  Request,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    //
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return await this.userService.getProfile(Number(req.user.id));
  }

  @Get('profile/:id')
  @UseGuards(JwtAuthGuard)
  async getProfileById(@Param('id') id: number, @Request() req) {
    return await this.userService.getProfileById(id, Number(req.user.id));
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return await this.userService.updateProfile(
      Number(req.user.id),
      updateUserProfileDto,
    );
  }
}
