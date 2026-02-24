import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GradeLevelService } from './grade-level.service';

@Controller('grade-levels')
export class GradeLevelController {
  constructor(private readonly gradeLevelService: GradeLevelService) {}

  @Get('value/:value')
  async getByValue(@Param('value') value: string) {
    return this.gradeLevelService.findByValue(parseInt(value));
  }

  @Get(':id')
  async getGradeLevelById(@Param('id') id: string) {
    return this.gradeLevelService.getGradeLevelById(id);
  }

  @Get()
  async getAllGradeLevels() {
    return this.gradeLevelService.getAllGradeLevels();
  }

  @Post()
  async createGradeLevel(@Body() data: any) {
    return this.gradeLevelService.createGradeLevel(data);
  }

  @Put(':id')
  async updateGradeLevel(@Param('id') id: string, @Body() data: any) {
    return this.gradeLevelService.updateGradeLevel(id, data);
  }

  @Delete(':id')
  async deleteGradeLevel(@Param('id') id: string) {
    await this.gradeLevelService.deleteGradeLevel(id);
    return { message: 'Grade level deleted successfully' };
  }
}
