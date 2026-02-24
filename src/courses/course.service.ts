import { Injectable } from '@nestjs/common';
import { CourseRepositoryAbstract } from './infrastructure/persistence/document/repositories/course.repository.abstract';
import { Course } from './domain/course';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepositoryAbstract) {}

  async createCourse(data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    return this.courseRepository.create(data);
  }

  async getCourseById(id: string): Promise<Course | null> {
    return this.courseRepository.findById(id);
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }

  async updateCourse(id: string, data: Partial<Course>): Promise<Course | null> {
    return this.courseRepository.update(id, data);
  }

  async deleteCourse(id: string): Promise<void> {
    return this.courseRepository.delete(id);
  }

  async findByAuthorId(authorId: string): Promise<Course[]> {
    return this.courseRepository.findByAuthorId(authorId);
  }

  async findBySubjectId(subjectId: string): Promise<Course[]> {
    return this.courseRepository.findBySubjectId(subjectId);
  }

  async findPublished(): Promise<Course[]> {
    return this.courseRepository.findPublished();
  }

  async publishCourse(id: string): Promise<Course | null> {
    return this.updateCourse(id, { isPublished: true } as Partial<Course>);
  }
}
