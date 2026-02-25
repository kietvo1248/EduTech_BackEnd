import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsEnum } from 'class-validator';
import { TransactionStatus } from '../../enums';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'Transaction amount',
    example: 9.99,
  })
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({
    description: 'Currency code',
    example: 'USD',
  })
  @IsString()
  @IsNotEmpty()
  currency!: string;

  @ApiProperty({
    description: 'Payment provider',
    example: 'MOMO',
  })
  @IsString()
  @IsNotEmpty()
  provider!: string;

  @ApiProperty({
    description: 'Provider reference ID',
    example: 'TXN123456789',
  })
  @IsString()
  @IsNotEmpty()
  providerRefId!: string;

  @ApiProperty({
    description: 'Transaction status',
    enum: TransactionStatus,
    enumName: 'TransactionStatus',
    example: TransactionStatus.Pending,
  })
  @IsEnum(TransactionStatus)
  @IsNotEmpty()
  status!: string;
}
