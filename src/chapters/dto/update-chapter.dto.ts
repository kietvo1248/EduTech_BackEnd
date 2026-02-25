import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class UpdateChapterDto {
  @ApiPropertyOptional({
    description: 'Course ID this chapter belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  courseId?: string;

  @ApiPropertyOptional({
    description: 'Chapter title',
    example: 'Advanced TypeScript',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Display order of the chapter',
    example: 2,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  orderIndex?: number;
}
