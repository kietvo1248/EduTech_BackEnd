import { Injectable } from '@nestjs/common';
import { UserSubscription } from '../../../../domain/user-subscription';
import { UserSubscriptionDocumentType } from '../schemas/user-subscription.schema';

@Injectable()
export class UserSubscriptionMapper {
  toDomain(doc: UserSubscriptionDocumentType): UserSubscription {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      planId: doc.planId.toString(),
      startDate: doc.startDate,
      endDate: doc.endDate,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: UserSubscriptionDocumentType[]): UserSubscription[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
