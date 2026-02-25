import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateParentStudentLinkDto {
  @ApiPropertyOptional({
    description: 'Parent user ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({
    description: 'Student user ID',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsOptional()
  studentId?: string;

  @ApiPropertyOptional({
    description: 'Whether the link is verified',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;
}
