import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../users/domain/user';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly refreshTokenExpirationDays: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.refreshTokenExpirationDays =
      this.configService.get<number>('REFRESH_TOKEN_EXPIRES_DAYS') || 7;
  }

  async signUp(dto: SignUpDto): Promise<{ user: User }> {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
      isActive: true,
    });

    this.logger.log(`User registered: ${user.email}`);
    return { user };
  }

  async signIn(
    dto: SignInDto,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException('User must sign up with password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new BadRequestException('Account is disabled');
    }

    const accessToken = this.createAccessToken(user);
    const refreshToken = this.generateRefreshToken(user.id);

    // TODO: Save refresh token to sessions table
    // await this.sessionService.create({ userId: user.id, hashedRt, deviceInfo, ipAddress, expiresAt });

    this.logger.log(`User signed in: ${user.email}`);
    return { user, accessToken, refreshToken };
  }

  async refreshAccessToken(
    dto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // TODO: Validate refresh token from sessions table
    // const session = await this.sessionService.validateRefreshToken(userId, hashedRt);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const user = await this.usersService.findById(payload.sub as string);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newAccessToken = this.createAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user.id);

      this.logger.log(`Access token refreshed for user: ${user.email}`);
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  createAccessToken(user: User): string {
    return this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role },
      {
        expiresIn: '15m',
        secret: this.configService.get<string>('JWT_SECRET'),
      },
    );
  }

  private generateRefreshToken(userId: string): string {
    const expirationTime = new Date();
    expirationTime.setDate(
      expirationTime.getDate() + this.refreshTokenExpirationDays,
    );

    const payload = {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(expirationTime.getTime() / 1000),
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }
}
