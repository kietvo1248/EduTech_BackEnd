import { Chapter } from '../../../../domain/chapter';

export abstract class ChapterRepositoryAbstract {
  abstract findById(id: string): Promise<Chapter | null>;
  abstract findAll(): Promise<Chapter[]>;
  abstract create(
    data: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Chapter>;
  abstract update(id: string, data: Partial<Chapter>): Promise<Chapter | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByCourseId(courseId: string): Promise<Chapter[]>;
  abstract reorderChapters(
    courseId: string,
    chapters: Array<{ id: string; orderIndex: number }>,
  ): Promise<Chapter[]>;
}
