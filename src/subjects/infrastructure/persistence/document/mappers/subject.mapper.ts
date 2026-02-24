import { Injectable } from '@nestjs/common';
import { Subject } from '../../../../domain/subject';
import { SubjectDocumentType } from '../schemas/subject.schema';

@Injectable()
export class SubjectMapper {
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

  toDomainArray(docs: SubjectDocumentType[]): Subject[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
