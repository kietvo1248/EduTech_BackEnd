import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateParentProfileDto {
  @ApiPropertyOptional({
    description: 'User ID this profile belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Parent full name',
    example: 'Robert Williams',
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional({
    description: 'Parent phone number',
    example: '+9876543210',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
