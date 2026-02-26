import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsInt, Min, IsOptional, IsArray } from 'class-validator';

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

  @ApiPropertyOptional({
    description: 'Quiz ID',
    example: '507f1f77bcf86cd799439013',
  })
  @IsString()
  @IsOptional()
  quizId?: string;

  @ApiPropertyOptional({
    description: 'Lesson ID',
    example: '507f1f77bcf86cd799439014',
  })
  @IsString()
  @IsOptional()
  lessonId?: string;

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

  @ApiPropertyOptional({
    description: 'Quiz score (0-100)',
    example: 85,
  })
  @IsInt()
  @IsOptional()
  @Min(0)
  score?: number;

  @ApiPropertyOptional({
    description: 'Total number of questions',
    example: 10,
  })
  @IsInt()
  @IsOptional()
  @Min(0)
  totalQuestions?: number;

  @ApiPropertyOptional({
    description: 'Number of correct answers',
    example: 8,
  })
  @IsInt()
  @IsOptional()
  @Min(0)
  correctAnswers?: number;

  @ApiPropertyOptional({
    description: 'All answers in the quiz',
    example: [
      { questionId: '1', selectedAnswer: 'A', isCorrect: true },
      { questionId: '2', selectedAnswer: 'B', isCorrect: false },
    ],
  })
  @IsArray()
  @IsOptional()
  answers?: Array<{
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }>;

  @ApiProperty({
    description: 'Time spent on the question in milliseconds',
    example: 5000,
  })
  @IsInt()
  @Min(0)
  timeSpentMs!: number;

  @ApiPropertyOptional({
    description: 'When the attempt was completed',
    example: '2024-02-26T21:00:00Z',
  })
  @IsOptional()
  completedAt?: Date;
}
