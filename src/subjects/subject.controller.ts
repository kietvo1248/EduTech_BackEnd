import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, UpdateSubjectDto, QuerySubjectDto } from './dto';
import { BaseController } from '../core/base/base.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators';
import { UserRole } from '../enums';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectController extends BaseController {
  constructor(private readonly subjectService: SubjectService) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Get all subjects with filters' })
  @ApiQuery({ type: QuerySubjectDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of subjects retrieved successfully',
  })
  async getAllSubjects(@Query() query: QuerySubjectDto, @Res() res: Response) {
    try {
      const { subjects, total } =
        await this.subjectService.getAllSubjectsWithFilter(query);

      if (query.page && query.limit) {
        return this.sendPaginated(
          res,
          subjects,
          total,
          query.page,
          query.limit,
        );
      }

      return this.sendSuccess(res, subjects, 'Subjects retrieved successfully');
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Failed to retrieve subjects',
        'Failed to retrieve subjects',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get subject by slug' })
  @ApiParam({ name: 'slug', description: 'Subject slug' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Subject retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Subject not found',
  })
  async getBySlug(@Param('slug') slug: string, @Res() res: Response) {
    try {
      const subject = await this.subjectService.getSubjectBySlug(slug);
      return this.sendSuccess(res, subject, 'Subject retrieved successfully');
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Failed to retrieve subject',
        'Failed to retrieve subject',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subject by ID' })
  @ApiParam({ name: 'id', description: 'Subject ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Subject retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Subject not found',
  })
  async getSubjectById(@Param('id') id: string, @Res() res: Response) {
    try {
      const subject = await this.subjectService.getSubjectById(id);
      return this.sendSuccess(res, subject, 'Subject retrieved successfully');
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Failed to retrieve subject',
        'Failed to retrieve subject',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Teacher)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new subject (Admin/Teacher only)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Subject created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Insufficient permissions',
  })
  async createSubject(@Body() data: CreateSubjectDto, @Res() res: Response) {
    try {
      const subject = await this.subjectService.createSubject(data);
      return this.sendSuccess(
        res,
        subject,
        'Subject created successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Failed to create subject',
        'Failed to create subject',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Teacher)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a subject (Admin/Teacher only)' })
  @ApiParam({ name: 'id', description: 'Subject ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Subject updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Subject not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Insufficient permissions',
  })
  async updateSubject(
    @Param('id') id: string,
    @Body() data: UpdateSubjectDto,
    @Res() res: Response,
  ) {
    try {
      const subject = await this.subjectService.updateSubject(id, data);
      return this.sendSuccess(res, subject, 'Subject updated successfully');
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Failed to update subject',
        'Failed to update subject',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Teacher)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a subject (Admin/Teacher only)' })
  @ApiParam({ name: 'id', description: 'Subject ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Subject deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Subject not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Insufficient permissions',
  })
  async deleteSubject(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.subjectService.softDeleteSubject(id);
      return this.sendSuccess(
        res,
        { deleted: true },
        'Subject deleted successfully',
      );
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Failed to delete subject',
        'Failed to delete subject',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Teacher)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Restore a soft-deleted subject (Admin/Teacher only)',
  })
  @ApiParam({ name: 'id', description: 'Subject ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Subject restored successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Subject not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Insufficient permissions',
  })
  async restoreSubject(@Param('id') id: string, @Res() res: Response) {
    try {
      const subject = await this.subjectService.restoreSubject(id);
      return this.sendSuccess(res, subject, 'Subject restored successfully');
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Failed to restore subject',
        'Failed to restore subject',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
