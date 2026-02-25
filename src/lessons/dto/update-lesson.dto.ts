import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsBoolean, IsOptional } from 'class-validator';

export class UpdateLessonDto {
  @ApiPropertyOptional({
    description: 'Chapter ID this lesson belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  chapterId?: string;

  @ApiPropertyOptional({
    description: 'Lesson title',
    example: 'Advanced Variables',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Lesson description',
    example: 'Deep dive into advanced variable concepts',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Display order of the lesson',
    example: 2,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  orderIndex?: number;

  @ApiPropertyOptional({
    description: 'Duration of the lesson in seconds',
    example: 900,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  durationSeconds?: number;

  @ApiPropertyOptional({
    description: 'Video URL for the lesson',
    example: 'https://example.com/new-video.mp4',
  })
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiPropertyOptional({
    description: 'Lesson content in Markdown format',
    example: '# Updated Content\n\nNew lesson material...',
  })
  @IsString()
  @IsOptional()
  contentMd?: string;

  @ApiPropertyOptional({
    description: 'Whether this lesson is available as a preview',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isPreview?: boolean;
}
