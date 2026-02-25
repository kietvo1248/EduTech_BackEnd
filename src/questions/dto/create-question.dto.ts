import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { QuestionType, Difficulty } from '../../enums';

export class CreateQuestionDto {
  @ApiPropertyOptional({
    description: 'Lesson ID this question belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsOptional()
  lessonId?: string;

  @ApiProperty({
    description: 'Question content in HTML format',
    example: '<p>What is 2 + 2?</p>',
  })
  @IsString()
  @IsNotEmpty()
  contentHtml!: string;

  @ApiProperty({
    description: 'Type of question',
    enum: QuestionType,
    enumName: 'QuestionType',
    example: QuestionType.MultipleChoice,
  })
  @IsEnum(QuestionType)
  @IsNotEmpty()
  type!: string;

  @ApiProperty({
    description: 'Difficulty level',
    enum: Difficulty,
    enumName: 'Difficulty',
    example: Difficulty.Easy,
  })
  @IsEnum(Difficulty)
  @IsNotEmpty()
  difficulty!: string;

  @ApiProperty({
    description: 'Array of answer options',
    example: ['2', '3', '4', '5'],
  })
  @IsArray()
  @IsString({ each: true })
  options!: string[];

  @ApiProperty({
    description: 'The correct answer',
    example: '4',
  })
  @IsString()
  @IsNotEmpty()
  correctAnswer!: string;

  @ApiProperty({
    description: 'Explanation for the answer',
    example: '2 + 2 equals 4 in basic arithmetic',
  })
  @IsString()
  @IsNotEmpty()
  explanation!: string;
}
