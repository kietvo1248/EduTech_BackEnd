import { Injectable } from '@nestjs/common';
import { ChapterRepositoryAbstract } from './infrastructure/persistence/document/repositories/chapter.repository.abstract';
import { Chapter } from './domain/chapter';

@Injectable()
export class ChapterService {
  constructor(private readonly chapterRepository: ChapterRepositoryAbstract) {}

  async createChapter(
    data: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Chapter> {
    return this.chapterRepository.create(data);
  }

  async getChapterById(id: string): Promise<Chapter | null> {
    return this.chapterRepository.findById(id);
  }

  async getAllChapters(): Promise<Chapter[]> {
    return this.chapterRepository.findAll();
  }

  async updateChapter(
    id: string,
    data: Partial<Chapter>,
  ): Promise<Chapter | null> {
    return this.chapterRepository.update(id, data);
  }

  async deleteChapter(id: string): Promise<void> {
    return this.chapterRepository.delete(id);
  }

  async findByCourseId(courseId: string): Promise<Chapter[]> {
    return this.chapterRepository.findByCourseId(courseId);
  }

  async reorderChapters(
    courseId: string,
    chapters: Array<{ id: string; orderIndex: number }>,
  ): Promise<Chapter[]> {
    return this.chapterRepository.reorderChapters(courseId, chapters);
  }
}
