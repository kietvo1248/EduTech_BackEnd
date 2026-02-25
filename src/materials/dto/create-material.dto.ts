import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({
    description: 'Lesson ID this material belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  lessonId!: string;

  @ApiProperty({
    description: 'Material title',
    example: 'Course Notes PDF',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'File URL for the material',
    example: 'https://example.com/material.pdf',
  })
  @IsString()
  @IsNotEmpty()
  fileUrl!: string;

  @ApiProperty({
    description: 'Type of the material',
    example: 'pdf',
  })
  @IsString()
  @IsNotEmpty()
  type!: string;
}
