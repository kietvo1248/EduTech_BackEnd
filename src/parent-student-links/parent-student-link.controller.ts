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
import { ParentStudentLinkService } from './parent-student-link.service';
import { CreateParentStudentLinkDto, UpdateParentStudentLinkDto } from './dto';

@Controller('parent-student-links')
export class ParentStudentLinkController {
  constructor(
    private readonly parentStudentLinkService: ParentStudentLinkService,
  ) {}

  @Get('parent/:parentId')
  async getStudentsByParentId(@Param('parentId') parentId: string) {
    return this.parentStudentLinkService.getStudentsByParentId(parentId);
  }

  @Get('parent/:parentId/verified')
  async getVerifiedStudentsByParentId(@Param('parentId') parentId: string) {
    return this.parentStudentLinkService.getVerifiedStudentsByParentId(
      parentId,
    );
  }

  @Get('student/:studentId')
  async getParentsByStudentId(@Param('studentId') studentId: string) {
    return this.parentStudentLinkService.getParentsByStudentId(studentId);
  }

  @Get('student/:studentId/verified')
  async getVerifiedParentsByStudentId(@Param('studentId') studentId: string) {
    return this.parentStudentLinkService.getVerifiedParentsByStudentId(
      studentId,
    );
  }

  @Get(':parentId/:studentId')
  async getLinkByParentAndStudent(
    @Param('parentId') parentId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.parentStudentLinkService.getLinkByParentAndStudent(
      parentId,
      studentId,
    );
  }

  @Get(':id')
  async getLinkById(@Param('id') id: string) {
    return this.parentStudentLinkService.getLinkById(id);
  }

  @Get()
  async getAllLinks(@Query() filters?: Record<string, unknown>) {
    if (Object.keys(filters || {}).length > 0) {
      return this.parentStudentLinkService.filterLinks(
        filters as Record<string, unknown>,
      );
    }
    return this.parentStudentLinkService.getAllLinks();
  }

  @Post()
  async createLink(@Body() data: CreateParentStudentLinkDto) {
    return this.parentStudentLinkService.createLink(data);
  }

  @Put(':id')
  async updateLink(
    @Param('id') id: string,
    @Body() data: UpdateParentStudentLinkDto,
  ) {
    return this.parentStudentLinkService.updateLink(id, data);
  }

  @Put(':id/verify')
  async verifyLink(@Param('id') id: string) {
    return this.parentStudentLinkService.verifyLink(id);
  }

  @Delete(':id')
  async deleteLink(@Param('id') id: string) {
    await this.parentStudentLinkService.deleteLink(id);
    return { message: 'Link deleted successfully' };
  }
}
