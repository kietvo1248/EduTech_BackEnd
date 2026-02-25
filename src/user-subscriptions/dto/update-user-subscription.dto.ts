import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { SubscriptionStatus } from '../../enums';

export class UpdateUserSubscriptionDto {
  @ApiPropertyOptional({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Subscription plan ID',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsOptional()
  planId?: string;

  @ApiPropertyOptional({
    description: 'Subscription start date',
    example: '2024-02-01',
  })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Subscription end date',
    example: '2025-01-31',
  })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Subscription status',
    enum: SubscriptionStatus,
    enumName: 'SubscriptionStatus',
  })
  @IsEnum(SubscriptionStatus)
  @IsOptional()
  status?: string;
}
