import { Question } from '../../../../domain/question';

export abstract class QuestionRepositoryAbstract {
  abstract findById(id: string): Promise<Question | null>;
  abstract findAll(): Promise<Question[]>;
  abstract create(
    data: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Question>;
  abstract update(
    id: string,
    data: Partial<Question>,
  ): Promise<Question | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByLessonId(lessonId: string): Promise<Question[]>;
  abstract findByDifficulty(difficulty: string): Promise<Question[]>;
  abstract getRandomQuestion(limit?: number): Promise<Question[]>;
}
