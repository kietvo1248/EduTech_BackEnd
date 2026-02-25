import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsEnum, IsOptional } from 'class-validator';
import { TransactionStatus } from '../../enums';

export class UpdateTransactionDto {
  @ApiPropertyOptional({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Transaction amount',
    example: 19.99,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({
    description: 'Currency code',
    example: 'EUR',
  })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional({
    description: 'Payment provider',
    example: 'VNPAY',
  })
  @IsString()
  @IsOptional()
  provider?: string;

  @ApiPropertyOptional({
    description: 'Provider reference ID',
    example: 'TXN987654321',
  })
  @IsString()
  @IsOptional()
  providerRefId?: string;

  @ApiPropertyOptional({
    description: 'Transaction status',
    enum: TransactionStatus,
    enumName: 'TransactionStatus',
  })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: string;
}
