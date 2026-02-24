import { Injectable } from '@nestjs/common';
import { Chapter } from '../../../../domain/chapter';
import { ChapterDocumentType } from '../schemas/chapter.schema';

@Injectable()
export class ChapterMapper {
  toDomain(doc: ChapterDocumentType): Chapter {
    return {
      id: doc._id.toString(),
      courseId: doc.courseId.toString(),
      title: doc.title,
      orderIndex: doc.orderIndex,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: ChapterDocumentType[]): Chapter[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
