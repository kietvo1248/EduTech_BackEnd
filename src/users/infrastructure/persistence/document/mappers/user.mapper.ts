import { Injectable } from '@nestjs/common';
import { User } from '../../../../domain/user';
import { UserDocumentType } from '../schemas/user.schema';
import { UserRole } from '../../../../../enums';

@Injectable()
export class UserMapper {
  toDomain(doc: UserDocumentType): User {
    return {
      id: doc._id.toString(),
      email: doc.email,
      passwordHash: doc.passwordHash ?? null,
      role: doc.role ?? UserRole.Student,
      avatarUrl: doc.avatarUrl ?? null,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: UserDocumentType[]): User[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
