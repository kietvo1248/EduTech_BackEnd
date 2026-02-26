import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  QuizAttemptDocument,
  QuizAttemptDocumentType,
} from '../schemas/quiz-attempt.schema';
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

  async create(
    data: Omit<QuizAttempt, 'id' | 'createdAt'>,
  ): Promise<QuizAttempt> {
    const createData: any = {
      userId: new Types.ObjectId(data.userId),
      questionId: new Types.ObjectId(data.questionId),
      isCorrect: data.isCorrect,
      userAnswer: data.userAnswer,
      score: data.score,
      totalQuestions: data.totalQuestions,
      correctAnswers: data.correctAnswers,
      answers: data.answers || [],
      timeSpentMs: data.timeSpentMs,
    };

    if (data.quizId) {
      createData.quizId = new Types.ObjectId(data.quizId);
    }
    if (data.lessonId) {
      createData.lessonId = new Types.ObjectId(data.lessonId);
    }
    if (data.completedAt) {
      createData.completedAt = data.completedAt;
    }

    const doc = await this.quizAttemptModel.create(createData);
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

  async findByUserAndQuestion(
    userId: string,
    questionId: string,
  ): Promise<QuizAttempt[]> {
    const docs = await this.quizAttemptModel.find({
      userId: new Types.ObjectId(userId),
      questionId: new Types.ObjectId(questionId),
    });
    return this.mapper.toDomainArray(docs);
  }

  async getAttemptStats(userId: string): Promise<{
    totalAttempts: number;
    correctAttempts: number;
    accuracy: string | number;
    averageTimeSpentMs: number;
    totalTimeSpentMs: number;
  }> {
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

    interface StatsResult {
      totalAttempts: number;
      correctAttempts: number;
      averageTimeSpentMs: number;
      totalTimeSpentMs: number;
    }

    const result = stats[0] as StatsResult | undefined;

    return result
      ? {
          totalAttempts: result.totalAttempts,
          correctAttempts: result.correctAttempts,
          accuracy: (
            (result.correctAttempts / result.totalAttempts) *
            100
          ).toFixed(2),
          averageTimeSpentMs: Math.round(result.averageTimeSpentMs),
          totalTimeSpentMs: result.totalTimeSpentMs,
        }
      : {
          totalAttempts: 0,
          correctAttempts: 0,
          accuracy: 0,
          averageTimeSpentMs: 0,
          totalTimeSpentMs: 0,
        };
  }

  async findBestAttemptByUserAndQuiz(
    userId: string,
    quizId: string,
  ): Promise<QuizAttempt | null> {
    const doc = await this.quizAttemptModel
      .findOne({
        userId: new Types.ObjectId(userId),
        quizId: new Types.ObjectId(quizId),
      })
      .sort({ score: -1, createdAt: -1 });

    return doc ? this.mapper.toDomain(doc) : null;
  }
}
