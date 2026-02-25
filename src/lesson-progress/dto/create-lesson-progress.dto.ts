import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsInt, Min } from 'class-validator';

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
  })
  @IsBoolean()
  isCompleted!: boolean;

  @ApiProperty({
    description: 'Last watched position in seconds',
    example: 120,
  })
  @IsInt()
  @Min(0)
  lastWatchedSec!: number;
}
