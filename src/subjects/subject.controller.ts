import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, UpdateSubjectDto } from './dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.subjectService.findBySlug(slug);
  }

  @Get(':id')
  async getSubjectById(@Param('id') id: string) {
    return this.subjectService.getSubjectById(id);
  }

  @Get()
  async getAllSubjects() {
    return this.subjectService.getAllSubjects();
  }

  @Post()
  async createSubject(@Body() data: CreateSubjectDto) {
    return this.subjectService.createSubject(data);
  }

  @Put(':id')
  async updateSubject(@Param('id') id: string, @Body() data: UpdateSubjectDto) {
    return this.subjectService.updateSubject(id, data);
  }

  @Delete(':id')
  async deleteSubject(@Param('id') id: string) {
    await this.subjectService.deleteSubject(id);
    return { message: 'Subject deleted successfully' };
  }
}
