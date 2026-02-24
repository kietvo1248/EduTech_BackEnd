import { Injectable } from '@nestjs/common';
import { SubscriptionPlanRepositoryAbstract } from './infrastructure/persistence/document/repositories/subscription-plan.repository.abstract';
import { SubscriptionPlan } from './domain/subscription-plan';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    private readonly subscriptionPlanRepository: SubscriptionPlanRepositoryAbstract,
  ) {}

  async createPlan(
    data: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SubscriptionPlan> {
    return this.subscriptionPlanRepository.create(data);
  }

  async getPlanById(id: string): Promise<SubscriptionPlan | null> {
    return this.subscriptionPlanRepository.findById(id);
  }

  async getAllPlans(): Promise<SubscriptionPlan[]> {
    return this.subscriptionPlanRepository.findAll();
  }

  async updatePlan(
    id: string,
    data: Partial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan | null> {
    return this.subscriptionPlanRepository.update(id, data);
  }

  async deletePlan(id: string): Promise<void> {
    return this.subscriptionPlanRepository.delete(id);
  }

  async findByName(name: string): Promise<SubscriptionPlan | null> {
    return this.subscriptionPlanRepository.findByName(name);
  }
}
