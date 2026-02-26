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
      progressPercent: doc.progressPercent || 0,
      videoWatched: doc.videoWatched || false,
      videoCurrentTime: doc.videoCurrentTime || 0,
      videoDuration: doc.videoDuration || 0,
      quizCompleted: doc.quizCompleted || false,
      quizScore: doc.quizScore,
      lastWatchedAt: doc.lastWatchedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: LessonProgressDocumentType[]): LessonProgress[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
