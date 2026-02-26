import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { GradeLevel, CourseStatus, CourseType } from '../../enums';

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
    description: 'Grade level (10, 11, 12) for content filtering',
    enum: GradeLevel,
    example: GradeLevel.Grade10,
  })
  @IsEnum(GradeLevel)
  gradeLevel!: GradeLevel;

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
    description: 'Course type (Free or Premium)',
    enum: CourseType,
    example: CourseType.Free,
  })
  @IsEnum(CourseType)
  type!: CourseType;

  @ApiProperty({
    description: 'Whether the course requires a pro subscription',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPro?: boolean;
}
