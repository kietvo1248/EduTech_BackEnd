import { Injectable } from '@nestjs/common';
import { LessonRepositoryAbstract } from './infrastructure/persistence/document/repositories/lesson.repository.abstract';
import { Lesson } from './domain/lesson';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepositoryAbstract) {}

  async createLesson(
    data: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Lesson> {
    return this.lessonRepository.create(data);
  }

  async getLessonById(id: string): Promise<Lesson | null> {
    return this.lessonRepository.findById(id);
  }

  async findById(id: string): Promise<Lesson | null> {
    return this.getLessonById(id);
  }

  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.findAll();
  }

  async updateLesson(
    id: string,
    data: Partial<Lesson>,
  ): Promise<Lesson | null> {
    return this.lessonRepository.update(id, data);
  }

  async deleteLesson(id: string): Promise<void> {
    return this.lessonRepository.delete(id);
  }

  async findByChapterId(chapterId: string): Promise<Lesson[]> {
    return this.lessonRepository.findByChapterId(chapterId);
  }

  async findByChapterIdOrdered(chapterId: string): Promise<Lesson[]> {
    return this.lessonRepository.findByChapterIdOrdered(chapterId);
  }

  async findByCourseId(courseId: string): Promise<Lesson[]> {
    return this.lessonRepository.findByCourseId(courseId);
  }

  async findPreviousLesson(lessonId: string): Promise<Lesson | null> {
    return this.lessonRepository.findPreviousLesson(lessonId);
  }

  async updateDuration(
    id: string,
    durationSeconds: number,
  ): Promise<Lesson | null> {
    return this.updateLesson(id, { durationSeconds } as Partial<Lesson>);
  }
}
