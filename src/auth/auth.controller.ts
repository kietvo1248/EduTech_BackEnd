import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email/register')
  @ApiResponse({
    status: 201,
    type: AuthResponseDto,
    description: 'User registered successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'User already exists or validation error',
  })
  async register(@Body() dto: SignUpDto): Promise<AuthResponseDto> {
    const { user } = await this.authService.signUp(dto);
    return {
      message: 'User registered successfully.',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    } as unknown as AuthResponseDto;
  }

  @Post('email/login')
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
    description: 'User logged in successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() dto: SignInDto): Promise<AuthResponseDto> {
    const { user, accessToken, refreshToken } =
      await this.authService.signIn(dto);
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  @Post('refresh')
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'New access token and refresh token generated',
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refreshToken(
    @Body() dto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.refreshAccessToken(dto);
  }
}
