import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @ApiPropertyOptional({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Notification title',
    example: 'Updated course',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Notification message',
    example: 'The course has been updated',
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({
    description: 'Whether the notification has been read',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @ApiPropertyOptional({
    description: 'Notification type',
    example: 'system_update',
  })
  @IsString()
  @IsOptional()
  type?: string;
}
