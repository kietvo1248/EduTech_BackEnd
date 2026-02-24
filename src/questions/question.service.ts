import { Injectable } from '@nestjs/common';
import { QuestionRepositoryAbstract } from './infrastructure/persistence/document/repositories/question.repository.abstract';
import { Question } from './domain/question';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepositoryAbstract) {}

  async createQuestion(data: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>): Promise<Question> {
    return this.questionRepository.create(data);
  }

  async getQuestionById(id: string): Promise<Question | null> {
    return this.questionRepository.findById(id);
  }

  async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.findAll();
  }

  async updateQuestion(id: string, data: Partial<Question>): Promise<Question | null> {
    return this.questionRepository.update(id, data);
  }

  async deleteQuestion(id: string): Promise<void> {
    return this.questionRepository.delete(id);
  }

  async findByLessonId(lessonId: string): Promise<Question[]> {
    return this.questionRepository.findByLessonId(lessonId);
  }

  async findByDifficulty(difficulty: string): Promise<Question[]> {
    return this.questionRepository.findByDifficulty(difficulty);
  }

  async getRandomQuestion(limit?: number): Promise<Question[]> {
    return this.questionRepository.getRandomQuestion(limit);
  }
}
