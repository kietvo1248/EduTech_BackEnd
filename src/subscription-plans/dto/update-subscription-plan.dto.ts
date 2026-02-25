import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsArray, IsOptional } from 'class-validator';

export class UpdateSubscriptionPlanDto {
  @ApiPropertyOptional({
    description: 'Plan name',
    example: 'Premium Yearly',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Plan price',
    example: 99.99,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'Plan duration in days',
    example: 365,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  durationDays?: number;

  @ApiPropertyOptional({
    description: 'Array of plan features',
    example: ['All features', 'Priority support', 'Early access'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];
}
