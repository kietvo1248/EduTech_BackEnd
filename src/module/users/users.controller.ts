import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AtGuard } from '../../common/guards'; // Guard kiểm tra token
import { GetCurrentUserId } from '../../common/decorators'; // Decorator lấy ID từ token

@ApiTags('Users - Quản lý người dùng')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Lấy thông tin cá nhân (Profile)' })
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @Get('me')
  getMe(@GetCurrentUserId() userId: string) {
    return this.usersService.getMe(userId);
  }

  @ApiOperation({ summary: 'Cập nhật thông tin cá nhân' })
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