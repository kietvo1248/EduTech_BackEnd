import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateMaterialDto {
  @ApiPropertyOptional({
    description: 'Lesson ID this material belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  lessonId?: string;

  @ApiPropertyOptional({
    description: 'Material title',
    example: 'Updated Course Notes',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'File URL for the material',
    example: 'https://example.com/updated-material.pdf',
  })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @ApiPropertyOptional({
    description: 'Type of the material',
    example: 'docx',
  })
  @IsString()
  @IsOptional()
  type?: string;
}
