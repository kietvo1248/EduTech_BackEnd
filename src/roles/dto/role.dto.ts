import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { UserRole } from '../../enums';

export class RoleDto {
  @ApiProperty({ type: String })
  @IsString()
  id: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  name: UserRole;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  permissions?: string[];

  @ApiProperty()
  @IsString()
  createdAt: Date;

  @ApiProperty()
  @IsString()
  updatedAt: Date;
}
