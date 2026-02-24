import { Injectable } from '@nestjs/common';
import { GradeLevel } from '../../../../domain/grade-level';
import { GradeLevelDocumentType } from '../schemas/grade-level.schema';

@Injectable()
export class GradeLevelMapper {
  toDomain(doc: GradeLevelDocumentType): GradeLevel {
    return {
      id: doc._id.toString(),
      name: doc.name,
      value: doc.value,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: GradeLevelDocumentType[]): GradeLevel[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
