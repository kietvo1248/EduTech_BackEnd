import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateCourseDto {
  @ApiPropertyOptional({
    description: 'Subject ID this course belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  subjectId?: string;

  @ApiPropertyOptional({
    description: 'Grade level ID this course belongs to',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsOptional()
  gradeLevelId?: string;

  @ApiPropertyOptional({
    description: 'Author ID (user who created the course)',
    example: '507f1f77bcf86cd799439013',
  })
  @IsString()
  @IsOptional()
  authorId?: string;

  @ApiPropertyOptional({
    description: 'Course title',
    example: 'Advanced Mathematics',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Course description',
    example: 'Dive deeper into mathematics',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Thumbnail URL for the course',
    example: 'https://example.com/new-thumbnail.jpg',
  })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiPropertyOptional({
    description: 'Whether the course is published',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the course requires a pro subscription',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isPro?: boolean;
}
