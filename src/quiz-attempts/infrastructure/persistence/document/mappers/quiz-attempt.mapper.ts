import { Injectable } from '@nestjs/common';
import { QuizAttempt } from '../../../../domain/quiz-attempt';
import { QuizAttemptDocumentType } from '../schemas/quiz-attempt.schema';

@Injectable()
export class QuizAttemptMapper {
  toDomain(doc: QuizAttemptDocumentType): QuizAttempt {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      questionId: doc.questionId.toString(),
      quizId: doc.quizId?.toString(),
      lessonId: doc.lessonId?.toString(),
      isCorrect: doc.isCorrect,
      userAnswer: doc.userAnswer,
      score: doc.score,
      totalQuestions: doc.totalQuestions,
      correctAnswers: doc.correctAnswers,
      answers: doc.answers || [],
      timeSpentMs: doc.timeSpentMs,
      completedAt: doc.completedAt,
      createdAt: doc.createdAt,
    };
  }

  toDomainArray(docs: QuizAttemptDocumentType[]): QuizAttempt[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
