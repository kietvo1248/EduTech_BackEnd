import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateSessionDto {
  @ApiPropertyOptional({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Hashed refresh token',
    example: '$2b$10$newhashedtoken',
  })
  @IsString()
  @IsOptional()
  hashedRt?: string;

  @ApiPropertyOptional({
    description: 'Device information',
    example: 'Firefox on macOS',
  })
  @IsString()
  @IsOptional()
  deviceInfo?: string;

  @ApiPropertyOptional({
    description: 'IP address',
    example: '192.168.1.2',
  })
  @IsString()
  @IsOptional()
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'Session expiration date',
    example: '2025-01-31T23:59:59Z',
  })
  @IsDateString()
  @IsOptional()
  expiresAt?: Date;
}
