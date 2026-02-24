import { Injectable } from '@nestjs/common';
import { Course } from '../../../../domain/course';
import { CourseDocumentType } from '../schemas/course.schema';

@Injectable()
export class CourseMapper {
  toDomain(doc: CourseDocumentType): Course {
    return {
      id: doc._id.toString(),
      subjectId: doc.subjectId.toString(),
      gradeLevelId: doc.gradeLevelId.toString(),
      authorId: doc.authorId.toString(),
      title: doc.title,
      description: doc.description,
      thumbnailUrl: doc.thumbnailUrl,
      isPublished: doc.isPublished,
      isPro: doc.isPro,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: CourseDocumentType[]): Course[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
