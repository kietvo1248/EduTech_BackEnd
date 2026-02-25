import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateQuizAttemptDto {
  @ApiPropertyOptional({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Question ID',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsOptional()
  questionId?: string;

  @ApiPropertyOptional({
    description: 'Whether the answer was correct',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;

  @ApiPropertyOptional({
    description: 'User answer',
    example: '5',
  })
  @IsString()
  @IsOptional()
  userAnswer?: string;

  @ApiPropertyOptional({
    description: 'Time spent on the question in milliseconds',
    example: 7000,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  timeSpentMs?: number;
}
