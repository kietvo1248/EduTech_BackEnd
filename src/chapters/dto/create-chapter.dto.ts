import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateChapterDto {
  @ApiProperty({
    description: 'Course ID this chapter belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  courseId!: string;

  @ApiProperty({
    description: 'Chapter title',
    example: 'Introduction to TypeScript',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Display order of the chapter',
    example: 1,
  })
  @IsInt()
  @Min(0)
  orderIndex!: number;
}
