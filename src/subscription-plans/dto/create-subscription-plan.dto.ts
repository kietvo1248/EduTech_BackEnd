import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsArray } from 'class-validator';

export class CreateSubscriptionPlanDto {
  @ApiProperty({
    description: 'Plan name',
    example: 'Premium Monthly',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Plan price',
    example: 9.99,
  })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({
    description: 'Plan duration in days',
    example: 30,
  })
  @IsNumber()
  @Min(1)
  durationDays!: number;

  @ApiProperty({
    description: 'Array of plan features',
    example: ['Unlimited access', 'Priority support', 'Ad-free'],
  })
  @IsArray()
  @IsString({ each: true })
  features!: string[];
}
