import { IsString, IsOptional, IsInt, Min, Max, IsDateString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '@prisma/client';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Nguyễn Văn A' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: '2008-01-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  // Dành riêng cho học sinh
  @ApiPropertyOptional({ example: 'THPT Chuyên Hùng Vương' })
  @IsOptional()
  @IsString()
  schoolName?: string;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(6)
  @Max(12)
  gradeLevel?: number;

  // Dành riêng cho giáo viên/phụ huynh (nếu cần thêm sau này)
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;
}