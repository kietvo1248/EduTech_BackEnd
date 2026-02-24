import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../domain/notification';
import { NotificationDocumentType } from '../schemas/notification.schema';

@Injectable()
export class NotificationMapper {
  toDomain(doc: NotificationDocumentType): Notification {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      title: doc.title,
      message: doc.message,
      isRead: doc.isRead,
      type: doc.type,
      createdAt: doc.createdAt,
    };
  }

  toDomainArray(docs: NotificationDocumentType[]): Notification[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
