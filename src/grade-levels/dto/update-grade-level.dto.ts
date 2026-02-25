import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateGradeLevelDto {
  @ApiPropertyOptional({
    description: 'Grade level name',
    example: 'Grade 2',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Numeric value of the grade level',
    example: 2,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  value?: number;
}
