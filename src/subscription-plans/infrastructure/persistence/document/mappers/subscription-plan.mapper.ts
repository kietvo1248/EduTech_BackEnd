import { Injectable } from '@nestjs/common';
import { SubscriptionPlan } from '../../../../domain/subscription-plan';
import { SubscriptionPlanDocumentType } from '../schemas/subscription-plan.schema';

@Injectable()
export class SubscriptionPlanMapper {
  toDomain(doc: SubscriptionPlanDocumentType): SubscriptionPlan {
    return {
      id: doc._id.toString(),
      name: doc.name,
      price: doc.price,
      durationDays: doc.durationDays,
      features: doc.features,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: SubscriptionPlanDocumentType[]): SubscriptionPlan[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
