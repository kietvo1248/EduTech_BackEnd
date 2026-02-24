import { Injectable } from '@nestjs/common';
import { Question } from '../../../../domain/question';
import { QuestionDocumentType } from '../schemas/question.schema';

@Injectable()
export class QuestionMapper {
  toDomain(doc: QuestionDocumentType): Question {
    return {
      id: doc._id.toString(),
      lessonId: doc.lessonId ? doc.lessonId.toString() : undefined,
      contentHtml: doc.contentHtml,
      type: doc.type,
      difficulty: doc.difficulty,
      options: doc.options,
      correctAnswer: doc.correctAnswer,
      explanation: doc.explanation,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: QuestionDocumentType[]): Question[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
