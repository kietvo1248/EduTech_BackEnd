import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, LogoutDto } from './dto'; // Import đủ DTO
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GetCurrentUser, GetCurrentUserId } from '../../common/decorators';
import { AtGuard, RtGuard } from '../../common/guards';
import { Request, Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Đăng ký học sinh mới' })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Đăng nhập' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Đăng xuất' })
  @ApiBearerAuth()
  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUserId() userId: string,
    @Body() dto: LogoutDto, // Cần lấy Refresh Token từ body để xóa đúng session
  ) {
    return this.authService.logout(userId, dto.refreshToken);
  }

  @ApiOperation({ summary: 'Lấy token mới bằng Refresh Token' })
  @ApiBearerAuth()
  @UseGuards(RtGuard) // Guard này sẽ validate token và trả về user trong req
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  // --- GOOGLE AUTH ---
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.googleLogin(req);
    // Redirect về App Mobile
    return res.redirect(
      `${process.env.FRONTEND_URL}/login-success?data=${JSON.stringify(tokens)}`,
    );
  }
}
