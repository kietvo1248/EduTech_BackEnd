import { Lesson } from '../../../../domain/lesson';

export abstract class LessonRepositoryAbstract {
  abstract findById(id: string): Promise<Lesson | null>;
  abstract findAll(): Promise<Lesson[]>;
  abstract create(data: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lesson>;
  abstract update(id: string, data: Partial<Lesson>): Promise<Lesson | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByChapterId(chapterId: string): Promise<Lesson[]>;
}
