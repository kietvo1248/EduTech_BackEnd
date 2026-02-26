import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/domain/user';
import {
  SequentialLearningService,
  VideoTrackingDto,
  QuizSubmissionDto,
  QuizResult,
} from './sequential-learning.service';

@ApiTags('sequential-learning')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sequential-learning')
export class SequentialLearningController {
  constructor(
    private readonly sequentialLearningService: SequentialLearningService,
  ) {}

  @Post('track-video')
  @ApiOperation({ summary: 'Track video watching progress' })
  @ApiResponse({
    status: 200,
    description: 'Video progress tracked successfully',
  })
  async trackVideoProgress(
    @CurrentUser() user: User,
    @Body() trackingData: VideoTrackingDto,
  ): Promise<{ success: boolean }> {
    await this.sequentialLearningService.trackVideoProgress(
      user.id,
      trackingData,
    );
    return { success: true };
  }

  @Get('quiz-access/:lessonId')
  @ApiOperation({ summary: 'Check if user can access quiz for a lesson' })
  @ApiResponse({ status: 200, description: 'Quiz access status retrieved' })
  async canAccessQuiz(
    @CurrentUser() user: User,
    @Param('lessonId') lessonId: string,
  ): Promise<{ canAccess: boolean }> {
    const canAccess = await this.sequentialLearningService.canAccessQuiz(
      user.id,
      lessonId,
    );
    return { canAccess };
  }

  @Post('submit-quiz')
  @ApiOperation({ summary: 'Submit quiz answers and get immediate results' })
  @ApiResponse({
    status: 200,
    description: 'Quiz submitted and graded successfully',
  })
  async submitQuiz(
    @CurrentUser() user: User,
    @Body() quizData: QuizSubmissionDto,
  ): Promise<QuizResult> {
    return this.sequentialLearningService.submitQuiz(user.id, quizData);
  }

  @Get('lesson-status/:lessonId')
  @ApiOperation({ summary: 'Get comprehensive lesson progress status' })
  @ApiResponse({
    status: 200,
    description: 'Lesson status retrieved successfully',
  })
  async getLessonStatus(
    @CurrentUser() user: User,
    @Param('lessonId') lessonId: string,
  ) {
    return this.sequentialLearningService.getLessonStatus(user.id, lessonId);
  }
}
