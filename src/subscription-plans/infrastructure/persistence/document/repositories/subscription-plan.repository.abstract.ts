import { SubscriptionPlan } from '../../../../domain/subscription-plan';

export abstract class SubscriptionPlanRepositoryAbstract {
  abstract findById(id: string): Promise<SubscriptionPlan | null>;
  abstract findAll(): Promise<SubscriptionPlan[]>;
  abstract create(data: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<SubscriptionPlan>;
  abstract update(id: string, data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByName(name: string): Promise<SubscriptionPlan | null>;
}
