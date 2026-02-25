import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'Notification title',
    example: 'New course available',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'A new course on Mathematics is now available',
  })
  @IsString()
  @IsNotEmpty()
  message!: string;

  @ApiProperty({
    description: 'Whether the notification has been read',
    example: false,
  })
  @IsBoolean()
  isRead!: boolean;

  @ApiProperty({
    description: 'Notification type',
    example: 'course_update',
  })
  @IsString()
  @IsNotEmpty()
  type!: string;
}
