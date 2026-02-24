import { Injectable } from '@nestjs/common';
import { TeacherProfile } from '../../../../domain/teacher-profile';
import { TeacherProfileDocumentType } from '../schemas/teacher-profile.schema';

@Injectable()
export class TeacherProfileMapper {
  toDomain(doc: TeacherProfileDocumentType): TeacherProfile {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      fullName: doc.fullName,
      bio: doc.bio ?? null,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: TeacherProfileDocumentType[]): TeacherProfile[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
