import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('published')
  async getPublished() {
    return this.courseService.findPublished();
  }

  @Get('author/:authorId')
  async getByAuthorId(@Param('authorId') authorId: string) {
    return this.courseService.findByAuthorId(authorId);
  }

  @Get('subject/:subjectId')
  async getBySubjectId(@Param('subjectId') subjectId: string) {
    return this.courseService.findBySubjectId(subjectId);
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Post()
  async createCourse(@Body() data: CreateCourseDto) {
    return this.courseService.createCourse(data);
  }

  @Put(':id')
  async updateCourse(@Param('id') id: string, @Body() data: UpdateCourseDto) {
    return this.courseService.updateCourse(id, data);
  }

  @Put(':id/publish')
  async publishCourse(@Param('id') id: string) {
    return this.courseService.publishCourse(id);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    await this.courseService.deleteCourse(id);
    return { message: 'Course deleted successfully' };
  }
}
