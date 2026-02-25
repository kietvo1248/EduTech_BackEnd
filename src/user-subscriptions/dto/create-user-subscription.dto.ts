import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';
import { SubscriptionStatus } from '../../enums';

export class CreateUserSubscriptionDto {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'Subscription plan ID',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsNotEmpty()
  planId!: string;

  @ApiProperty({
    description: 'Subscription start date',
    example: '2024-01-01',
  })
  @IsDateString()
  startDate!: Date;

  @ApiProperty({
    description: 'Subscription end date',
    example: '2024-12-31',
  })
  @IsDateString()
  endDate!: Date;

  @ApiProperty({
    description: 'Subscription status',
    enum: SubscriptionStatus,
    enumName: 'SubscriptionStatus',
    example: SubscriptionStatus.Active,
  })
  @IsEnum(SubscriptionStatus)
  @IsNotEmpty()
  status!: string;
}
