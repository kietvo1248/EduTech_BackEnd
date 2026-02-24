import { Injectable } from '@nestjs/common';
import { UserSubscriptionRepositoryAbstract } from './infrastructure/persistence/document/repositories/user-subscription.repository.abstract';
import { UserSubscription } from './domain/user-subscription';

@Injectable()
export class UserSubscriptionService {
  constructor(private readonly userSubscriptionRepository: UserSubscriptionRepositoryAbstract) {}

  async createSubscription(data: Omit<UserSubscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserSubscription> {
    return this.userSubscriptionRepository.create(data);
  }

  async getSubscriptionById(id: string): Promise<UserSubscription | null> {
    return this.userSubscriptionRepository.findById(id);
  }

  async getAllSubscriptions(): Promise<UserSubscription[]> {
    return this.userSubscriptionRepository.findAll();
  }

  async updateSubscription(id: string, data: Partial<UserSubscription>): Promise<UserSubscription | null> {
    return this.userSubscriptionRepository.update(id, data);
  }

  async deleteSubscription(id: string): Promise<void> {
    return this.userSubscriptionRepository.delete(id);
  }

  async findByUserId(userId: string): Promise<UserSubscription[]> {
    return this.userSubscriptionRepository.findByUserId(userId);
  }

  async findActiveSubscription(userId: string): Promise<UserSubscription | null> {
    return this.userSubscriptionRepository.findActiveSubscription(userId);
  }

  async findByUserAndStatus(userId: string, status: string): Promise<UserSubscription[]> {
    return this.userSubscriptionRepository.findByUserAndStatus(userId, status);
  }

  async isSubscriptionValid(userId: string): Promise<boolean> {
    const subscription = await this.findActiveSubscription(userId);
    if (!subscription) {
      return false;
    }
    const now = new Date();
    return subscription.status === 'ACTIVE' && subscription.endDate > now;
  }

  async expireSubscription(id: string): Promise<UserSubscription | null> {
    return this.userSubscriptionRepository.expireSubscription(id);
  }
}
