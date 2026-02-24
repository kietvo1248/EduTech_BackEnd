import { Course } from '../../../../domain/course';

export abstract class CourseRepositoryAbstract {
  abstract findById(id: string): Promise<Course | null>;
  abstract findAll(): Promise<Course[]>;
  abstract create(
    data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Course>;
  abstract update(id: string, data: Partial<Course>): Promise<Course | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByAuthorId(authorId: string): Promise<Course[]>;
  abstract findBySubjectId(subjectId: string): Promise<Course[]>;
  abstract findPublished(): Promise<Course[]>;
}
