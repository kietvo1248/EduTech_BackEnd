import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MaterialService } from './material.service';

@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get('lesson/:lessonId')
  async getByLessonId(@Param('lessonId') lessonId: string) {
    return this.materialService.findByLessonId(lessonId);
  }

  @Get(':id')
  async getMaterialById(@Param('id') id: string) {
    return this.materialService.getMaterialById(id);
  }

  @Get()
  async getAllMaterials() {
    return this.materialService.getAllMaterials();
  }

  @Post()
  async createMaterial(@Body() data: any) {
    return this.materialService.createMaterial(data);
  }

  @Put(':id')
  async updateMaterial(@Param('id') id: string, @Body() data: any) {
    return this.materialService.updateMaterial(id, data);
  }

  @Delete(':id')
  async deleteMaterial(@Param('id') id: string) {
    await this.materialService.deleteMaterial(id);
    return { message: 'Material deleted successfully' };
  }
}
