import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min, IsBoolean } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({
    description: 'Chapter ID this lesson belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  chapterId!: string;

  @ApiProperty({
    description: 'Lesson title',
    example: 'Variables and Data Types',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Lesson description',
    example: 'Learn about variables and basic data types',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    description: 'Display order of the lesson',
    example: 1,
  })
  @IsInt()
  @Min(0)
  orderIndex!: number;

  @ApiProperty({
    description: 'Duration of the lesson in seconds',
    example: 600,
  })
  @IsInt()
  @Min(0)
  durationSeconds!: number;

  @ApiProperty({
    description: 'Video URL for the lesson',
    example: 'https://example.com/video.mp4',
  })
  @IsString()
  @IsNotEmpty()
  videoUrl!: string;

  @ApiProperty({
    description: 'Lesson content in Markdown format',
    example: '# Introduction\n\nThis is the lesson content...',
  })
  @IsString()
  @IsNotEmpty()
  contentMd!: string;

  @ApiProperty({
    description: 'Whether this lesson is available as a preview',
    example: false,
  })
  @IsBoolean()
  isPreview!: boolean;
}
