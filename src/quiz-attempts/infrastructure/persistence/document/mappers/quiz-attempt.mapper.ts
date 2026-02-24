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
      isCorrect: doc.isCorrect,
      userAnswer: doc.userAnswer,
      timeSpentMs: doc.timeSpentMs,
      createdAt: doc.createdAt,
    };
  }

  toDomainArray(docs: QuizAttemptDocumentType[]): QuizAttempt[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
