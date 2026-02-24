import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';

@Controller('chapters')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get('course/:courseId')
  async getByCourseId(@Param('courseId') courseId: string) {
    return this.chapterService.findByCourseId(courseId);
  }

  @Get(':id')
  async getChapterById(@Param('id') id: string) {
    return this.chapterService.getChapterById(id);
  }

  @Get()
  async getAllChapters() {
    return this.chapterService.getAllChapters();
  }

  @Post()
  async createChapter(@Body() data: any) {
    return this.chapterService.createChapter(data);
  }

  @Put(':id')
  async updateChapter(@Param('id') id: string, @Body() data: any) {
    return this.chapterService.updateChapter(id, data);
  }

  @Put('course/:courseId/reorder')
  async reorderChapters(
    @Param('courseId') courseId: string,
    @Body() data: { chapters: Array<{ id: string; orderIndex: number }> },
  ) {
    return this.chapterService.reorderChapters(courseId, data.chapters);
  }

  @Delete(':id')
  async deleteChapter(@Param('id') id: string) {
    await this.chapterService.deleteChapter(id);
    return { message: 'Chapter deleted successfully' };
  }
}
