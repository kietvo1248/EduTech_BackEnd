import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { QuestionType, Difficulty } from '../../enums';

export class UpdateQuestionDto {
  @ApiPropertyOptional({
    description: 'Lesson ID this question belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  lessonId?: string;

  @ApiPropertyOptional({
    description: 'Question content in HTML format',
    example: '<p>What is 3 + 3?</p>',
  })
  @IsString()
  @IsOptional()
  contentHtml?: string;

  @ApiPropertyOptional({
    description: 'Type of question',
    enum: QuestionType,
    enumName: 'QuestionType',
  })
  @IsEnum(QuestionType)
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    description: 'Difficulty level',
    enum: Difficulty,
    enumName: 'Difficulty',
  })
  @IsEnum(Difficulty)
  @IsOptional()
  difficulty?: string;

  @ApiPropertyOptional({
    description: 'Array of answer options',
    example: ['4', '5', '6', '7'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];

  @ApiPropertyOptional({
    description: 'The correct answer',
    example: '6',
  })
  @IsString()
  @IsOptional()
  correctAnswer?: string;

  @ApiPropertyOptional({
    description: 'Explanation for the answer',
    example: '3 + 3 equals 6',
  })
  @IsString()
  @IsOptional()
  explanation?: string;
}
