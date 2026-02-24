import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QuizAttemptDocument, QuizAttemptDocumentType } from '../schemas/quiz-attempt.schema';
import { QuizAttemptRepositoryAbstract } from './quiz-attempt.repository.abstract';
import { QuizAttemptMapper } from '../mappers/quiz-attempt.mapper';
import { QuizAttempt } from '../../../../domain/quiz-attempt';

@Injectable()
export class QuizAttemptRepository implements QuizAttemptRepositoryAbstract {
  constructor(
    @InjectModel(QuizAttemptDocument.name)
    private readonly quizAttemptModel: Model<QuizAttemptDocumentType>,
    private readonly mapper: QuizAttemptMapper,
  ) {}

  async findById(id: string): Promise<QuizAttempt | null> {
    const doc = await this.quizAttemptModel.findById(id);
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAll(): Promise<QuizAttempt[]> {
    const docs = await this.quizAttemptModel.find();
    return this.mapper.toDomainArray(docs);
  }

  async create(data: Omit<QuizAttempt, 'id' | 'createdAt'>): Promise<QuizAttempt> {
    const doc = await this.quizAttemptModel.create({
      userId: new Types.ObjectId(data.userId),
      questionId: new Types.ObjectId(data.questionId),
      isCorrect: data.isCorrect,
      userAnswer: data.userAnswer,
      timeSpentMs: data.timeSpentMs,
    });
    return this.mapper.toDomain(doc);
  }

  async delete(id: string): Promise<void> {
    await this.quizAttemptModel.findByIdAndDelete(id);
  }

  async findByUserId(userId: string): Promise<QuizAttempt[]> {
    const docs = await this.quizAttemptModel.find({
      userId: new Types.ObjectId(userId),
    });
    return this.mapper.toDomainArray(docs);
  }

  async findByQuestionId(questionId: string): Promise<QuizAttempt[]> {
    const docs = await this.quizAttemptModel.find({
      questionId: new Types.ObjectId(questionId),
    });
    return this.mapper.toDomainArray(docs);
  }

  async findByUserAndQuestion(userId: string, questionId: string): Promise<QuizAttempt[]> {
    const docs = await this.quizAttemptModel.find({
      userId: new Types.ObjectId(userId),
      questionId: new Types.ObjectId(questionId),
    });
    return this.mapper.toDomainArray(docs);
  }

  async getAttemptStats(userId: string): Promise<any> {
    const stats = await this.quizAttemptModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: '$userId',
          totalAttempts: { $sum: 1 },
          correctAttempts: {
            $sum: {
              $cond: ['$isCorrect', 1, 0],
            },
          },
          averageTimeSpentMs: { $avg: '$timeSpentMs' },
          totalTimeSpentMs: { $sum: '$timeSpentMs' },
        },
      },
    ]);
    return stats.length > 0
      ? {
          totalAttempts: stats[0].totalAttempts,
          correctAttempts: stats[0].correctAttempts,
          accuracy: ((stats[0].correctAttempts / stats[0].totalAttempts) * 100).toFixed(2),
          averageTimeSpentMs: Math.round(stats[0].averageTimeSpentMs),
          totalTimeSpentMs: stats[0].totalTimeSpentMs,
        }
      : {
          totalAttempts: 0,
          correctAttempts: 0,
          accuracy: 0,
          averageTimeSpentMs: 0,
          totalTimeSpentMs: 0,
        };
  }
}
