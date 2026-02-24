import { Injectable } from '@nestjs/common';
import { ParentStudentLink } from '../../../../domain/parent-student-link';
import { ParentStudentLinkDocumentType } from '../schemas/parent-student-link.schema';

@Injectable()
export class ParentStudentLinkMapper {
  toDomain(doc: ParentStudentLinkDocumentType): ParentStudentLink {
    return {
      id: doc._id.toString(),
      parentId: doc.parentId.toString(),
      studentId: doc.studentId.toString(),
      isVerified: doc.isVerified,
      createdAt: doc.createdAt,
    };
  }

  toDomainArray(docs: ParentStudentLinkDocumentType[]): ParentStudentLink[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
