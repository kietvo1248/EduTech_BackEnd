import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LessonProgressService } from './lesson-progress.service';

@Controller('lesson-progress')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: string) {
    return this.lessonProgressService.findByUserId(userId);
  }

  @Get('lesson/:lessonId')
  async getByLessonId(@Param('lessonId') lessonId: string) {
    return this.lessonProgressService.findByLessonId(lessonId);
  }

  @Get('user/:userId/lesson/:lessonId')
  async getProgressByUserAndLesson(
    @Param('userId') userId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonProgressService.getProgressByUserAndLesson(
      userId,
      lessonId,
    );
  }

  @Get(':id')
  async getProgressById(@Param('id') id: string) {
    return this.lessonProgressService.getProgressById(id);
  }

  @Get()
  async getAllProgress() {
    return this.lessonProgressService.getAllProgress();
  }

  @Post()
  async createProgress(@Body() data: any) {
    return this.lessonProgressService.createProgress(data);
  }

  @Put(':id')
  async updateProgress(@Param('id') id: string, @Body() data: any) {
    return this.lessonProgressService.updateProgress(id, data);
  }

  @Put('user/:userId/lesson/:lessonId/watched-time')
  async updateWatchedTime(
    @Param('userId') userId: string,
    @Param('lessonId') lessonId: string,
    @Body('seconds') seconds: number,
  ) {
    return this.lessonProgressService.updateWatchedTime(
      userId,
      lessonId,
      seconds,
    );
  }

  @Put('user/:userId/lesson/:lessonId/complete')
  async completeLesson(
    @Param('userId') userId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonProgressService.completeLesson(userId, lessonId);
  }

  @Delete(':id')
  async deleteProgress(@Param('id') id: string) {
    await this.lessonProgressService.deleteProgress(id);
    return { message: 'Lesson progress deleted successfully' };
  }
}
