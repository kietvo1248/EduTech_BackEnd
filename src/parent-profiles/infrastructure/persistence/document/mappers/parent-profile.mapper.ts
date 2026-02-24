import { Injectable } from '@nestjs/common';
import { ParentProfile } from '../../../../domain/parent-profile';
import { ParentProfileDocumentType } from '../schemas/parent-profile.schema';

@Injectable()
export class ParentProfileMapper {
  toDomain(doc: ParentProfileDocumentType): ParentProfile {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      fullName: doc.fullName,
      phoneNumber: doc.phoneNumber,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: ParentProfileDocumentType[]): ParentProfile[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
