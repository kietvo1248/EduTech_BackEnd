import { Injectable } from '@nestjs/common';
import { Subject } from '../../../../domain/subject';
import { SubjectDocumentType } from '../schemas/subject.schema';
import { BaseMapper } from '../../../../../core/base/base.mapper';

@Injectable()
export class SubjectMapper extends BaseMapper<Subject, SubjectDocumentType> {
  toDomain(doc: SubjectDocumentType): Subject {
    return {
      id: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
      iconUrl: doc.iconUrl,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
