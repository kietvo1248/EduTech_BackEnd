import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LessonService } from './lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get('chapter/:chapterId')
  async getByChapterId(@Param('chapterId') chapterId: string) {
    return this.lessonService.findByChapterId(chapterId);
  }

  @Get(':id')
  async getLessonById(@Param('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  @Get()
  async getAllLessons() {
    return this.lessonService.getAllLessons();
  }

  @Post()
  async createLesson(@Body() data: any) {
    return this.lessonService.createLesson(data);
  }

  @Put(':id')
  async updateLesson(@Param('id') id: string, @Body() data: any) {
    return this.lessonService.updateLesson(id, data);
  }

  @Put(':id/duration/:seconds')
  async updateDuration(
    @Param('id') id: string,
    @Param('seconds') seconds: string,
  ) {
    return this.lessonService.updateDuration(id, parseInt(seconds));
  }

  @Delete(':id')
  async deleteLesson(@Param('id') id: string) {
    await this.lessonService.deleteLesson(id);
    return { message: 'Lesson deleted successfully' };
  }
}
