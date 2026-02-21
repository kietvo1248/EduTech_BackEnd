import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AtGuard } from '../../common/guards';
import { GetCurrentUserId } from '../../common/decorators';

@ApiTags('Users (Cá nhân hóa)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Lấy thông tin tài khoản cá nhân' })
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @Get('me')
  getMe(@GetCurrentUserId() userId: string) {
    return this.usersService.getMe(userId);
  }

  @ApiOperation({ summary: 'Cập nhật thông tin tài khoản (Profile)' })
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @Patch('me')
  updateProfile(
    @GetCurrentUserId() userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(userId, dto);
  }
}
