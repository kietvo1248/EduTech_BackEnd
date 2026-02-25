import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseController } from '../core/base/base.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('email/register')
  @ApiOperation({ summary: 'Register new user with email verification' })
  @ApiResponse({
    status: 201,
    description:
      'User registered successfully. Verification email sent to inbox.',
  })
  @ApiResponse({
    status: 400,
    description: 'User already exists or validation error',
  })
  async register(
    @Body() dto: SignUpDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { user, message } = await this.authService.signUp(dto);
    return this.sendSuccess(
      res,
      {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      message,
      HttpStatus.CREATED,
    );
  }

  @Get('email/verify')
  @ApiOperation({ summary: 'Verify email with token from email link (Do not use this endpoint)' })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully - renders email-verified.hbs',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired token - renders verification-error.hbs',
  })
  async verifyEmail(
    @Query() dto: VerifyEmailDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const result = await this.authService.verifyEmail(dto.token);
      return res.render('email-verified', {
        message: result.message,
        email: result.user.email,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      return res.render('verification-error', {
        message: errorMessage,
      });
    }
  }

  @Post('email/resend-verification')
  @ApiOperation({ summary: 'Resend verification email (Do not use this endpoint)' })
  @ApiResponse({
    status: 200,
    description: 'Verification email sent',
  })
  @ApiResponse({
    status: 400,
    description: 'Email already verified or user not found',
  })
  async resendVerification(
    @Body() dto: ResendVerificationDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.authService.resendVerificationEmail(dto.email);
    return this.sendSuccess(res, {}, result.message, HttpStatus.OK);
  }

  @Post('email/login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
    description: 'User logged in successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 400,
    description: 'Email not verified',
  })
  async login(@Body() dto: SignInDto, @Res() res: Response): Promise<Response> {
    const { user, accessToken, refreshToken } =
      await this.authService.signIn(dto);
    return this.sendSuccess(
      res,
      {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      'Login successful',
      HttpStatus.OK,
    );
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
    @Res() res: Response,
  ): Promise<Response> {
    const tokens = await this.authService.refreshAccessToken(dto);
    return this.sendSuccess(
      res,
      tokens,
      'Token refreshed successfully',
      HttpStatus.OK,
    );
  }

  @Post('/migrate/users')
  @ApiOperation({ summary: 'Migrate Fields For Users (Do not use this endpoint in production)' })
  @ApiResponse({
    status: 201,
    description: 'Admin account created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Admin account already exists',
  })
  async createAdmin(
    @Res() res: Response,
  ): Promise<Response> {
    const admin = await this.authService.createAdminAccount();
    return this.sendSuccess(
      res,
      {
        user: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        },
      },
      'Admin account created successfully',
      HttpStatus.CREATED,
    );
  }
}

