import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriptionPlanDocument, SubscriptionPlanDocumentType } from '../schemas/subscription-plan.schema';
import { SubscriptionPlanRepositoryAbstract } from './subscription-plan.repository.abstract';
import { SubscriptionPlanMapper } from '../mappers/subscription-plan.mapper';
import { SubscriptionPlan } from '../../../../domain/subscription-plan';

@Injectable()
export class SubscriptionPlanRepository implements SubscriptionPlanRepositoryAbstract {
  constructor(
    @InjectModel(SubscriptionPlanDocument.name)
    private readonly subscriptionPlanModel: Model<SubscriptionPlanDocumentType>,
    private readonly mapper: SubscriptionPlanMapper,
  ) {}

  async findById(id: string): Promise<SubscriptionPlan | null> {
    const doc = await this.subscriptionPlanModel.findById(id);
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAll(): Promise<SubscriptionPlan[]> {
    const docs = await this.subscriptionPlanModel.find();
    return this.mapper.toDomainArray(docs);
  }

  async create(data: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<SubscriptionPlan> {
    const doc = await this.subscriptionPlanModel.create({
      name: data.name,
      price: data.price,
      durationDays: data.durationDays,
      features: data.features,
    });
    return this.mapper.toDomain(doc);
  }

  async update(id: string, data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan | null> {
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.durationDays) updateData.durationDays = data.durationDays;
    if (data.features) updateData.features = data.features;

    const doc = await this.subscriptionPlanModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await this.subscriptionPlanModel.findByIdAndDelete(id);
  }

  async findByName(name: string): Promise<SubscriptionPlan | null> {
    const doc = await this.subscriptionPlanModel.findOne({ name });
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
