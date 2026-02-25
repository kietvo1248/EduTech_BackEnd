import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { QuizAttemptService } from './quiz-attempt.service';
import { CreateQuizAttemptDto } from './dto';

@Controller('quiz-attempts')
export class QuizAttemptController {
  constructor(private readonly quizAttemptService: QuizAttemptService) {}

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: string) {
    return this.quizAttemptService.findByUserId(userId);
  }

  @Get('question/:questionId')
  async getByQuestionId(@Param('questionId') questionId: string) {
    return this.quizAttemptService.findByQuestionId(questionId);
  }

  @Get('user/:userId/question/:questionId')
  async getByUserAndQuestion(
    @Param('userId') userId: string,
    @Param('questionId') questionId: string,
  ) {
    return this.quizAttemptService.findByUserAndQuestion(userId, questionId);
  }

  @Get('stats/:userId')
  async getStats(@Param('userId') userId: string): Promise<{
    totalAttempts: number;
    correctAttempts: number;
    accuracy: string | number;
    averageTimeSpentMs: number;
    totalTimeSpentMs: number;
  }> {
    return this.quizAttemptService.getAttemptStats(userId);
  }

  @Get(':id')
  async getAttemptById(@Param('id') id: string) {
    return this.quizAttemptService.getAttemptById(id);
  }

  @Get()
  async getAllAttempts() {
    return this.quizAttemptService.getAllAttempts();
  }

  @Post()
  async recordAttempt(@Body() data: CreateQuizAttemptDto) {
    return this.quizAttemptService.recordAttempt(data);
  }

  @Delete(':id')
  async deleteAttempt(@Param('id') id: string) {
    await this.quizAttemptService.deleteAttempt(id);
    return { message: 'Quiz attempt deleted successfully' };
  }
}
