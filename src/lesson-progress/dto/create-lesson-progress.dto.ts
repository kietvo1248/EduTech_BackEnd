import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsInt, Min, Max, IsOptional, IsDate } from 'class-validator';

export class CreateLessonProgressDto {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'Lesson ID',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsNotEmpty()
  lessonId!: string;

  @ApiProperty({
    description: 'Whether the lesson is completed',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted!: boolean;

  @ApiProperty({
    description: 'Last watched position in seconds',
    example: 120,
    default: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  lastWatchedSec!: number;

  @ApiPropertyOptional({
    description: 'Progress percentage (0-100)',
    example: 75,
    minimum: 0,
    maximum: 100,
    default: 0,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  progressPercent!: number;

  @ApiPropertyOptional({
    description: 'Whether video has been fully watched',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  videoWatched!: boolean;

  @ApiPropertyOptional({
    description: 'Current video time in seconds',
    example: 180,
    default: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  videoCurrentTime!: number;

  @ApiPropertyOptional({
    description: 'Total video duration in seconds',
    example: 300,
    default: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  videoDuration!: number;

  @ApiPropertyOptional({
    description: 'Whether quiz has been completed',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  quizCompleted!: boolean;

  @ApiPropertyOptional({
    description: 'Quiz score (0-100)',
    example: 85,
    minimum: 0,
    maximum: 100,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  quizScore?: number;

  @ApiPropertyOptional({
    description: 'Last watched timestamp',
    type: Date,
  })
  @IsDate()
  @IsOptional()
  lastWatchedAt?: Date;
}
