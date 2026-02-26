import { Injectable } from '@nestjs/common';
import { Course } from '../../../../domain/course';
import { CourseDocumentType } from '../schemas/course.schema';
import { BaseMapper } from '../../../../../core/base/base.mapper';

@Injectable()
export class CourseMapper extends BaseMapper<Course, CourseDocumentType> {
  toDomain(doc: CourseDocumentType): Course {
    return {
      id: doc._id.toString(),
      subjectId: doc.subjectId.toString(),
      gradeLevelId: doc.gradeLevelId.toString(),
      gradeLevel: doc.gradeLevel,
      authorId: doc.authorId.toString(),
      title: doc.title,
      description: doc.description,
      thumbnailUrl: doc.thumbnailUrl,
      status: doc.status,
      type: doc.type,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
