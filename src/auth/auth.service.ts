import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersService } from '../users/users.service';
import { StudentProfileService } from '../student-profiles/student-profile.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../users/domain/user';
import { EmailVerificationService } from './services/email-verification.service';
import { EmailVerificationStatus, UserRole } from '../enums';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly refreshTokenExpirationDays: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly studentProfileService: StudentProfileService,
  ) {
    this.refreshTokenExpirationDays =
      this.configService.get<number>('REFRESH_TOKEN_EXPIRES_DAYS') || 7;
  }

  async signUp(dto: SignUpDto): Promise<{ user: User; message: string }> {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Generate verification token
    const verificationToken = this.generateVerificationToken();
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24); // 24 hours

    const user = await this.usersService.create({
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
      isActive: true,
      emailVerificationStatus: EmailVerificationStatus.Pending,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    });

    // Create student profile if role is student
    if (dto.role === UserRole.Student) {
      try {
        await this.studentProfileService.createProfile({
          userId: user.id,
          fullName: `${dto.firstName} ${dto.lastName}`,
          gradeLevel: dto.gradeLevel || null,
          diamondBalance: 0,
          xpTotal: 0,
          currentStreak: 0,
        });
      } catch (error) {
        this.logger.warn(
          `Failed to create student profile for ${user.email}`,
          error,
        );
      }
    }

    // Send verification email
    await this.emailVerificationService.sendVerificationEmail(
      user.email,
      verificationToken,
      dto.firstName,
    );

    this.logger.log(`User registered: ${user.email} - Verification email sent`);
    return {
      user,
      message:
        'Registration successful. Please check your email to verify your account.',
    };
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

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new BadRequestException('Account is disabled');
    }

    // Check if email is verified
    if (user.emailVerificationStatus !== EmailVerificationStatus.Verified) {
      throw new BadRequestException(
        'Please verify your email before signing in. Check your email for verification link.',
      );
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

  async verifyEmail(token: string): Promise<{ message: string; user: User }> {
    const user = await this.usersService.findByVerificationToken(token);

    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }

    if (user.emailVerificationStatus === EmailVerificationStatus.Verified) {
      return {
        message: 'Email already verified. You can sign in now.',
        user,
      };
    }

    if (
      !user.emailVerificationExpires ||
      new Date() > user.emailVerificationExpires
    ) {
      throw new BadRequestException(
        'Verification token expired. Please request a new one.',
      );
    }

    // Update user verification status
    const updatedUser = await this.usersService.update(user.id, {
      emailVerificationStatus: EmailVerificationStatus.Verified,
      emailVerificationToken: null,
      emailVerificationExpires: null,
    });

    this.logger.log(`Email verified for user: ${user.email}`);
    return {
      message: 'Email verified successfully! You can now sign in.',
      user: updatedUser!,
    };
  }

  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.emailVerificationStatus === EmailVerificationStatus.Verified) {
      throw new BadRequestException('Email already verified');
    }

    // Generate new verification token
    const verificationToken = this.generateVerificationToken();
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24);

    await this.usersService.update(user.id, {
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    });

    // Send verification email
    await this.emailVerificationService.sendVerificationEmail(
      user.email,
      verificationToken,
      user.email.split('@')[0], // Use email prefix as firstName
    );

    this.logger.log(`Verification email resent to: ${user.email}`);
    return { message: 'Verification email sent. Please check your inbox.' };
  }

  private generateVerificationToken(): string {
    return randomBytes(32).toString('hex');
  }
}
