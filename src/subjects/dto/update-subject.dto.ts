import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateSubjectDto {
  @ApiPropertyOptional({
    description: 'Subject name',
    example: 'Advanced Mathematics',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'URL-friendly slug for the subject',
    example: 'advanced-mathematics',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({
    description: 'Icon URL for the subject',
    example: 'https://example.com/new-icon.svg',
  })
  @IsString()
  @IsOptional()
  iconUrl?: string;
}
