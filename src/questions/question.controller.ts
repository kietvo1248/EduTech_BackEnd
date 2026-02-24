import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('lesson/:lessonId')
  async getByLessonId(@Param('lessonId') lessonId: string) {
    return this.questionService.findByLessonId(lessonId);
  }

  @Get('difficulty/:difficulty')
  async getByDifficulty(@Param('difficulty') difficulty: string) {
    return this.questionService.findByDifficulty(difficulty);
  }

  @Get('random')
  async getRandomQuestion(@Query('limit') limit?: string) {
    return this.questionService.getRandomQuestion(limit ? parseInt(limit) : 1);
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string) {
    return this.questionService.getQuestionById(id);
  }

  @Get()
  async getAllQuestions() {
    return this.questionService.getAllQuestions();
  }

  @Post()
  async createQuestion(@Body() data: any) {
    return this.questionService.createQuestion(data);
  }

  @Put(':id')
  async updateQuestion(@Param('id') id: string, @Body() data: any) {
    return this.questionService.updateQuestion(id, data);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    await this.questionService.deleteQuestion(id);
    return { message: 'Question deleted successfully' };
  }
}
