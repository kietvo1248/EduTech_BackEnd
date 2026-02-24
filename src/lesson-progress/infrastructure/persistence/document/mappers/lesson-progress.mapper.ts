import { Injectable } from '@nestjs/common';
import { LessonProgress } from '../../../../domain/lesson-progress';
import { LessonProgressDocumentType } from '../schemas/lesson-progress.schema';

@Injectable()
export class LessonProgressMapper {
  toDomain(doc: LessonProgressDocumentType): LessonProgress {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      lessonId: doc.lessonId.toString(),
      isCompleted: doc.isCompleted,
      lastWatchedSec: doc.lastWatchedSec,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: LessonProgressDocumentType[]): LessonProgress[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
