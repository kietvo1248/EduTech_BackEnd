import { Injectable } from '@nestjs/common';
import { QuizAttemptRepositoryAbstract } from './infrastructure/persistence/document/repositories/quiz-attempt.repository.abstract';
import { QuizAttempt } from './domain/quiz-attempt';

@Injectable()
export class QuizAttemptService {
  constructor(
    private readonly quizAttemptRepository: QuizAttemptRepositoryAbstract,
  ) {}

  async recordAttempt(
    data: Omit<QuizAttempt, 'id' | 'createdAt'>,
  ): Promise<QuizAttempt> {
    return this.quizAttemptRepository.create(data);
  }

  async getAttemptById(id: string): Promise<QuizAttempt | null> {
    return this.quizAttemptRepository.findById(id);
  }

  async getAllAttempts(): Promise<QuizAttempt[]> {
    return this.quizAttemptRepository.findAll();
  }

  async deleteAttempt(id: string): Promise<void> {
    return this.quizAttemptRepository.delete(id);
  }

  async findByUserId(userId: string): Promise<QuizAttempt[]> {
    return this.quizAttemptRepository.findByUserId(userId);
  }

  async findByQuestionId(questionId: string): Promise<QuizAttempt[]> {
    return this.quizAttemptRepository.findByQuestionId(questionId);
  }

  async findByUserAndQuestion(
    userId: string,
    questionId: string,
  ): Promise<QuizAttempt[]> {
    return this.quizAttemptRepository.findByUserAndQuestion(userId, questionId);
  }

  async getAttemptStats(userId: string): Promise<{
    totalAttempts: number;
    correctAttempts: number;
    accuracy: string | number;
    averageTimeSpentMs: number;
    totalTimeSpentMs: number;
  }> {
    return this.quizAttemptRepository.getAttemptStats(userId);
  }
}
