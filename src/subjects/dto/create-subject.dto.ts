import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'Subject name',
    example: 'Mathematics',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'URL-friendly slug for the subject',
    example: 'mathematics',
  })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty({
    description: 'Icon URL for the subject',
    example: 'https://example.com/icon.svg',
  })
  @IsString()
  @IsNotEmpty()
  iconUrl!: string;
}
