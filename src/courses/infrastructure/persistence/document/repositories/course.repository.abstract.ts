import { Course } from '../../../../domain/course';
import { GradeLevel, CourseStatus } from '../../../../../enums';

export abstract class CourseRepositoryAbstract {
  abstract findById(id: string): Promise<Course | null>;
  abstract findByIdNotDeleted(id: string): Promise<Course | null>;
  abstract findAll(): Promise<Course[]>;
  abstract findAllNotDeleted(): Promise<Course[]>;
  abstract create(
    data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Course>;
  abstract update(id: string, data: Partial<Course>): Promise<Course | null>;
  abstract delete(id: string): Promise<void>;
  
  // Filter and search methods
  abstract findByFilter(filter: any, sort?: any): Promise<Course[]>;
  abstract findByFilterWithPagination(
    filter: any,
    sort: any,
    skip: number,
    limit: number,
  ): Promise<Course[]>;
  abstract countByFilter(filter: any): Promise<number>;
  
  // Author-related methods
  abstract findByAuthorId(authorId: string): Promise<Course[]>;
  abstract findByAuthorIdNotDeleted(authorId: string): Promise<Course[]>;
  
  // Subject-related methods
  abstract findBySubjectId(subjectId: string): Promise<Course[]>;
  abstract findBySubjectIdNotDeleted(subjectId: string): Promise<Course[]>;
  
  // Status-related methods
  abstract findPublished(): Promise<Course[]>;
  abstract findByStatusNotDeleted(status: CourseStatus): Promise<Course[]>;
  
  // Grade level methods
  abstract findByGradeLevel(gradeLevel: GradeLevel): Promise<Course[]>;
  abstract findByGradeLevelNotDeleted(gradeLevel: GradeLevel): Promise<Course[]>;
  
  // Other methods
  abstract getChaptersWithLessons(courseId: string): Promise<any[]>;
}
