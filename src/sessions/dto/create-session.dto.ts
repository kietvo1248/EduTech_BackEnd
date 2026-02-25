import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'Hashed refresh token',
    example: '$2b$10$abcdefghijklmnopqrstuvwxyz',
  })
  @IsString()
  @IsNotEmpty()
  hashedRt!: string;

  @ApiProperty({
    description: 'Device information',
    example: 'Chrome on Windows 10',
  })
  @IsString()
  @IsNotEmpty()
  deviceInfo!: string;

  @ApiProperty({
    description: 'IP address',
    example: '192.168.1.1',
  })
  @IsString()
  @IsNotEmpty()
  ipAddress!: string;

  @ApiProperty({
    description: 'Session expiration date',
    example: '2024-12-31T23:59:59Z',
  })
  @IsDateString()
  expiresAt!: Date;
}
