import { LessonProgress } from '../../../../domain/lesson-progress';

export abstract class LessonProgressRepositoryAbstract {
  abstract findById(id: string): Promise<LessonProgress | null>;
  abstract findAll(): Promise<LessonProgress[]>;
  abstract create(data: Omit<LessonProgress, 'id' | 'createdAt' | 'updatedAt'>): Promise<LessonProgress>;
  abstract update(id: string, data: Partial<LessonProgress>): Promise<LessonProgress | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<LessonProgress[]>;
  abstract findByLessonId(lessonId: string): Promise<LessonProgress[]>;
  abstract findByUserAndLesson(userId: string, lessonId: string): Promise<LessonProgress | null>;
  abstract updateWatchedTime(userId: string, lessonId: string, seconds: number): Promise<LessonProgress | null>;
}
