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
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CourseService } from './course.service';
import {
  CreateCourseDto,
  UpdateCourseDto,
  QueryCourseDto,
  UpdateCourseStatusDto,
} from './dto';
import { CourseStatus, UserRole } from '../enums';
import { BaseController } from '../core/base/base.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser, Roles } from '../auth/decorators';
import { User } from '../users/domain/user';

@ApiTags('Courses')
@Controller('courses')
export class CourseController extends BaseController {
  constructor(private readonly courseService: CourseService) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses with filtering and sorting' })
  @ApiResponse({ status: 200, description: 'Courses retrieved successfully' })
  async getAllCourses(@Query() query: QueryCourseDto, @Res() res: Response) {
    try {
      const result = await this.courseService.getAllCoursesWithFilter(query);

      if (query.page && query.limit) {
        return this.sendPaginated(
          res,
          result.courses,
          result.total,
          query.page,
          query.limit,
        );
      }

      return this.sendSuccess(
        res,
        result.courses,
        'Courses retrieved successfully',
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return this.sendError(
        res,
        message,
        'Failed to retrieve courses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('published')
  @ApiOperation({ summary: 'Get published courses' })
  @ApiResponse({
    status: 200,
    description: 'Published courses retrieved successfully',
  })
  async getPublishedCourses(@Res() res: Response) {
    try {
      const courses = await this.courseService.findPublished();
      return this.sendSuccess(
        res,
        courses,
        'Published courses retrieved successfully',
      );
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Unknown error',
        'Failed to retrieve published courses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('my-courses')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get courses created by current user' })
  @ApiResponse({
    status: 200,
    description: 'User courses retrieved successfully',
  })
  async getMyCourses(
    @CurrentUser() user: User,
    @Query() query: QueryCourseDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.courseService.findByAuthorIdWithFilter(
        user.id,
        query,
      );

      if (query.page && query.limit) {
        return this.sendPaginated(
          res,
          result.courses,
          result.total,
          query.page,
          query.limit,
        );
      }

      return this.sendSuccess(
        res,
        result.courses,
        'User courses retrieved successfully',
      );
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Unknown error',
        'Failed to retrieve user courses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('subject/:subjectId')
  @ApiOperation({ summary: 'Get courses by subject ID' })
  @ApiResponse({
    status: 200,
    description: 'Subject courses retrieved successfully',
  })
  async getCoursesBySubject(
    @Param('subjectId') subjectId: string,
    @Query() query: QueryCourseDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.courseService.findBySubjectIdWithFilter(
        subjectId,
        query,
      );

      if (query.page && query.limit) {
        return this.sendPaginated(
          res,
          result.courses,
          result.total,
          query.page,
          query.limit,
        );
      }

      return this.sendSuccess(
        res,
        result.courses,
        'Subject courses retrieved successfully',
      );
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Unknown error',
        'Failed to retrieve subject courses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiResponse({ status: 200, description: 'Course retrieved successfully' })
  async getCourseById(@Param('id') id: string, @Res() res: Response) {
    try {
      const course = await this.courseService.getCourseById(id);
      if (!course) {
        return this.sendError(
          res,
          {},
          'Course not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return this.sendSuccess(res, course, 'Course retrieved successfully');
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Unknown error',
        'Failed to retrieve course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Teacher)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new course (Admin/Teacher only)' })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @CurrentUser() user: User,
    @Res() res: Response,
  ) {
    try {
      // Automatically assign authorId from JWT token
      const courseData = {
        ...createCourseDto,
        authorId: user.id,
        status: CourseStatus.Draft,
        isDeleted: false,
      };

      const course = await this.courseService.createCourse(courseData);
      return this.sendSuccess(
        res,
        course,
        'Course created successfully',
        HttpStatus.CREATED,
      );
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Unknown error',
        'Failed to create course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Teacher)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update course (Admin/Teacher only)' })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @CurrentUser() user: User,
    @Res() res: Response,
  ) {
    try {
      // Check if user owns the course or has admin rights
      const course = await this.courseService.getCourseById(id);
      if (!course) {
        return this.sendError(
          res,
          {},
          'Course not found',
          HttpStatus.NOT_FOUND,
        );
      }

      if (course.authorId !== user.id) {
        return this.sendError(
          res,
          {},
          'You do not have permission to update this course',
          HttpStatus.FORBIDDEN,
        );
      }

      const updatedCourse = await this.courseService.updateCourse(
        id,
        updateCourseDto,
      );
      return this.sendSuccess(
        res,
        updatedCourse,
        'Course updated successfully',
      );
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Unknown error',
        'Failed to update course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Teacher)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update course status (Admin/Teacher only)' })
  @ApiResponse({
    status: 200,
    description: 'Course status updated successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  async updateCourseStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateCourseStatusDto,
    @CurrentUser() user: User,
    @Res() res: Response,
  ) {
    try {
      // Check if user owns the course or has admin rights
      const course = await this.courseService.getCourseById(id);
      if (!course) {
        return this.sendError(
          res,
          {},
          'Course not found',
          HttpStatus.NOT_FOUND,
        );
      }

      if (course.authorId !== user.id) {
        return this.sendError(
          res,
          {},
          'You do not have permission to update this course status',
          HttpStatus.FORBIDDEN,
        );
      }

      const updatedCourse = await this.courseService.updateCourseStatus(
        id,
        updateStatusDto.status,
      );
      return this.sendSuccess(
        res,
        updatedCourse,
        'Course status updated successfully',
      );
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Unknown error',
        'Failed to update course status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Teacher)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete course (Admin/Teacher only)' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  async deleteCourse(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Res() res: Response,
  ) {
    try {
      // Check if user owns the course or has admin rights
      const course = await this.courseService.getCourseById(id);
      if (!course) {
        return this.sendError(
          res,
          {},
          'Course not found',
          HttpStatus.NOT_FOUND,
        );
      }

      if (course.authorId !== user.id) {
        return this.sendError(
          res,
          {},
          'You do not have permission to delete this course',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.courseService.softDeleteCourse(id);
      return this.sendSuccess(res, null, 'Course deleted successfully');
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Unknown error',
        'Failed to delete course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.Teacher)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restore soft deleted course (Admin/Teacher only)' })
  @ApiResponse({ status: 200, description: 'Course restored successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  async restoreCourse(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Res() res: Response,
  ) {
    try {
      // Check if user owns the course or has admin rights
      const course = await this.courseService.getCourseByIdWithDeleted(id);
      if (!course) {
        return this.sendError(
          res,
          {},
          'Course not found',
          HttpStatus.NOT_FOUND,
        );
      }

      if (course.authorId !== user.id) {
        return this.sendError(
          res,
          {},
          'You do not have permission to restore this course',
          HttpStatus.FORBIDDEN,
        );
      }

      const restoredCourse = await this.courseService.restoreCourse(id);
      return this.sendSuccess(
        res,
        restoredCourse,
        'Course restored successfully',
      );
    } catch (error) {
      return this.sendError(
        res,
        error instanceof Error ? error.message : 'Unknown error',
        'Failed to restore course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
