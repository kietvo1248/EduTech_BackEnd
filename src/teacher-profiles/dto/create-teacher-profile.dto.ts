import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTeacherProfileDto {
  @ApiProperty({
    description: 'User ID this profile belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'Teacher full name',
    example: 'John Smith',
  })
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiPropertyOptional({
    description: 'Teacher bio',
    example: 'Experienced math teacher with 10 years of experience',
  })
  @IsString()
  @IsOptional()
  bio?: string | null;
}
