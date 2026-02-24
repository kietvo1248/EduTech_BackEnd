import { Injectable } from '@nestjs/common';
import { LessonProgressRepositoryAbstract } from './infrastructure/persistence/document/repositories/lesson-progress.repository.abstract';
import { LessonProgress } from './domain/lesson-progress';

@Injectable()
export class LessonProgressService {
  constructor(
    private readonly lessonProgressRepository: LessonProgressRepositoryAbstract,
  ) {}

  async createProgress(
    data: Omit<LessonProgress, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<LessonProgress> {
    return this.lessonProgressRepository.create(data);
  }

  async getProgressById(id: string): Promise<LessonProgress | null> {
    return this.lessonProgressRepository.findById(id);
  }

  async getAllProgress(): Promise<LessonProgress[]> {
    return this.lessonProgressRepository.findAll();
  }

  async updateProgress(
    id: string,
    data: Partial<LessonProgress>,
  ): Promise<LessonProgress | null> {
    return this.lessonProgressRepository.update(id, data);
  }

  async deleteProgress(id: string): Promise<void> {
    return this.lessonProgressRepository.delete(id);
  }

  async findByUserId(userId: string): Promise<LessonProgress[]> {
    return this.lessonProgressRepository.findByUserId(userId);
  }

  async findByLessonId(lessonId: string): Promise<LessonProgress[]> {
    return this.lessonProgressRepository.findByLessonId(lessonId);
  }

  async getProgressByUserAndLesson(
    userId: string,
    lessonId: string,
  ): Promise<LessonProgress | null> {
    return this.lessonProgressRepository.findByUserAndLesson(userId, lessonId);
  }

  async updateWatchedTime(
    userId: string,
    lessonId: string,
    seconds: number,
  ): Promise<LessonProgress | null> {
    return this.lessonProgressRepository.updateWatchedTime(
      userId,
      lessonId,
      seconds,
    );
  }

  async completeLesson(
    userId: string,
    lessonId: string,
  ): Promise<LessonProgress | null> {
    const progress = await this.lessonProgressRepository.findByUserAndLesson(
      userId,
      lessonId,
    );
    if (progress) {
      return this.lessonProgressRepository.update(progress.id, {
        isCompleted: true,
      });
    }
    return this.lessonProgressRepository.create({
      userId,
      lessonId,
      isCompleted: true,
      lastWatchedSec: 0,
    });
  }
}
