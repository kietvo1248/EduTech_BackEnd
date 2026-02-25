import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Subject ID this course belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  subjectId!: string;

  @ApiProperty({
    description: 'Grade level ID this course belongs to',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsNotEmpty()
  gradeLevelId!: string;

  @ApiProperty({
    description: 'Author ID (user who created the course)',
    example: '507f1f77bcf86cd799439013',
  })
  @IsString()
  @IsNotEmpty()
  authorId!: string;

  @ApiProperty({
    description: 'Course title',
    example: 'Introduction to Mathematics',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Course description',
    example: 'Learn the fundamentals of mathematics',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    description: 'Thumbnail URL for the course',
    example: 'https://example.com/thumbnail.jpg',
  })
  @IsString()
  @IsNotEmpty()
  thumbnailUrl!: string;

  @ApiProperty({
    description: 'Whether the course is published',
    example: true,
  })
  @IsBoolean()
  isPublished!: boolean;

  @ApiProperty({
    description: 'Whether the course requires a pro subscription',
    example: false,
  })
  @IsBoolean()
  isPro!: boolean;
}
