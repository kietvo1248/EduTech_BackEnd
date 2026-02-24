import { QuizAttempt } from '../../../../domain/quiz-attempt';

export abstract class QuizAttemptRepositoryAbstract {
  abstract findById(id: string): Promise<QuizAttempt | null>;
  abstract findAll(): Promise<QuizAttempt[]>;
  abstract create(data: Omit<QuizAttempt, 'id' | 'createdAt'>): Promise<QuizAttempt>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<QuizAttempt[]>;
  abstract findByQuestionId(questionId: string): Promise<QuizAttempt[]>;
  abstract findByUserAndQuestion(userId: string, questionId: string): Promise<QuizAttempt[]>;
  abstract getAttemptStats(userId: string): Promise<any>;
}
