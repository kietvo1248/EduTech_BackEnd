import { Injectable } from '@nestjs/common';
import { CourseRepositoryAbstract } from './infrastructure/persistence/document/repositories/course.repository.abstract';
import { Course } from './domain/course';
import { GradeLevel, CourseStatus } from '../enums';
import { QueryCourseDto } from './dto';
import { BaseService } from '../core/base/base.service';

@Injectable()
export class CourseService extends BaseService {
  constructor(private readonly courseRepository: CourseRepositoryAbstract) {
    super();
  }

  async createCourse(
    data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Course> {
    // Automatically set status to Draft for new courses
    const courseData = {
      ...data,
      status: CourseStatus.Draft,
      isDeleted: false,
      deletedAt: null,
    };
    return this.courseRepository.create(courseData);
  }

  async getCourseById(id: string): Promise<Course | null> {
    return this.courseRepository.findByIdNotDeleted(id);
  }

  async getCourseByIdWithDeleted(id: string): Promise<Course | null> {
    return this.courseRepository.findById(id);
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.findAllNotDeleted();
  }

  async getAllCoursesWithFilter(query: QueryCourseDto): Promise<{
    courses: Course[];
    total: number;
  }> {
    const filterDto = query.filter || {};
    const sortDto = query.sort || {};
    
    // Extract filter fields
    const search = filterDto.search;
    const gradeLevel = filterDto.gradeLevel;
    const status = filterDto.status;
    const type = filterDto.type;
    const authorId = filterDto.authorId;
    const subjectId = filterDto.subjectId;
    const sortBy = sortDto.field;
    const sortOrder = sortDto.order;
    const page = query.page;
    const limit = query.limit;

    // Build filter object for MongoDB query
    const filter: any = { isDeleted: false };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (gradeLevel) {
      filter.gradeLevel = gradeLevel;
    }

    if (status) {
      filter.status = status;
    }

    if (type) {
      filter.type = type;
    }

    if (authorId) {
      filter.authorId = authorId;
    }

    if (subjectId) {
      filter.subjectId = subjectId;
    }

    // Build sort object
    const sort: any = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1; // Default sort by creation date descending
    }

    // Get total count
    const total = await this.courseRepository.countByFilter(filter);

    // Get courses with pagination
    let courses: Course[];
    if (page && limit) {
      const skip = (page - 1) * limit;
      courses = await this.courseRepository.findByFilterWithPagination(
        filter,
        sort,
        skip,
        limit,
      );
    } else {
      courses = await this.courseRepository.findByFilter(filter, sort);
    }

    return { courses, total };
  }

  async findByAuthorIdWithFilter(
    authorId: string,
    query: QueryCourseDto,
  ): Promise<{ courses: Course[]; total: number }> {
    const updatedQuery = { ...query, authorId };
    return this.getAllCoursesWithFilter(updatedQuery);
  }

  async findBySubjectIdWithFilter(
    subjectId: string,
    query: QueryCourseDto,
  ): Promise<{ courses: Course[]; total: number }> {
    const updatedQuery = { ...query, subjectId };
    return this.getAllCoursesWithFilter(updatedQuery);
  }

  async updateCourse(
    id: string,
    data: Partial<Course>,
  ): Promise<Course | null> {
    // Remove fields that shouldn't be updated directly
    const { status, isDeleted, deletedAt, ...updateData } = data;
    return this.courseRepository.update(id, updateData);
  }

  async updateCourseStatus(
    id: string,
    status: CourseStatus,
  ): Promise<Course | null> {
    return this.courseRepository.update(id, { status });
  }

  async softDeleteCourse(id: string): Promise<void> {
    await this.courseRepository.update(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }

  async restoreCourse(id: string): Promise<Course | null> {
    return this.courseRepository.update(id, {
      isDeleted: false,
      deletedAt: null,
    });
  }

  async deleteCourse(id: string): Promise<void> {
    return this.courseRepository.delete(id);
  }

  async findByAuthorId(authorId: string): Promise<Course[]> {
    return this.courseRepository.findByAuthorIdNotDeleted(authorId);
  }

  async findBySubjectId(subjectId: string): Promise<Course[]> {
    return this.courseRepository.findBySubjectIdNotDeleted(subjectId);
  }

  async findPublished(): Promise<Course[]> {
    return this.courseRepository.findByStatusNotDeleted(CourseStatus.Published);
  }

  async findByGradeLevel(gradeLevel: GradeLevel): Promise<Course[]> {
    return this.courseRepository.findByGradeLevelNotDeleted(gradeLevel);
  }

  async getChaptersWithLessons(courseId: string): Promise<any[]> {
    // TODO: Implement actual logic to get chapters with lessons
    return this.courseRepository.getChaptersWithLessons(courseId);
  }

  // Legacy method - deprecated, use updateCourseStatus instead
  async publishCourse(id: string): Promise<Course | null> {
    return this.updateCourseStatus(id, CourseStatus.Published);
  }
}
