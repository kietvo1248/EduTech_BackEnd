import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateLessonProgressDto {
  @ApiPropertyOptional({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Lesson ID',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsOptional()
  lessonId?: string;

  @ApiPropertyOptional({
    description: 'Whether the lesson is completed',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @ApiPropertyOptional({
    description: 'Last watched position in seconds',
    example: 300,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  lastWatchedSec?: number;
}
