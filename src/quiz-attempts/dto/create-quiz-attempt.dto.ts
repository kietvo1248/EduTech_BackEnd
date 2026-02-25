import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateQuizAttemptDto {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    description: 'Question ID',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsNotEmpty()
  questionId!: string;

  @ApiProperty({
    description: 'Whether the answer was correct',
    example: true,
  })
  @IsBoolean()
  isCorrect!: boolean;

  @ApiProperty({
    description: 'User answer',
    example: '4',
  })
  @IsString()
  @IsNotEmpty()
  userAnswer!: string;

  @ApiProperty({
    description: 'Time spent on the question in milliseconds',
    example: 5000,
  })
  @IsInt()
  @Min(0)
  timeSpentMs!: number;
}
