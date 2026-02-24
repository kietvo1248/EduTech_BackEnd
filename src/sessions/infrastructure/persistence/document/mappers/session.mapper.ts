import { Injectable } from '@nestjs/common';
import { Session } from '../../../../domain/session';
import { SessionDocumentType } from '../schemas/session.schema';

@Injectable()
export class SessionMapper {
  toDomain(doc: SessionDocumentType): Session {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      hashedRt: doc.hashedRt,
      deviceInfo: doc.deviceInfo,
      ipAddress: doc.ipAddress,
      expiresAt: doc.expiresAt,
      createdAt: doc.createdAt,
    };
  }

  toDomainArray(docs: SessionDocumentType[]): Session[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
