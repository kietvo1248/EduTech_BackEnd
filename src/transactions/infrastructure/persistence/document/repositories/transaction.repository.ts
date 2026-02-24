import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  TransactionDocument,
  TransactionDocumentType,
} from '../schemas/transaction.schema';
import { TransactionRepositoryAbstract } from './transaction.repository.abstract';
import { TransactionMapper } from '../mappers/transaction.mapper';
import { Transaction } from '../../../../domain/transaction';

@Injectable()
export class TransactionRepository implements TransactionRepositoryAbstract {
  constructor(
    @InjectModel(TransactionDocument.name)
    private readonly transactionModel: Model<TransactionDocumentType>,
    private readonly mapper: TransactionMapper,
  ) {}

  async findById(id: string): Promise<Transaction | null> {
    const doc = await this.transactionModel.findById(id);
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Transaction[]> {
    const docs = await this.transactionModel.find();
    return this.mapper.toDomainArray(docs);
  }

  async create(
    data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Transaction> {
    const doc = await this.transactionModel.create({
      userId: new Types.ObjectId(data.userId),
      amount: data.amount,
      currency: data.currency,
      provider: data.provider,
      providerRefId: data.providerRefId,
      status: data.status,
    });
    return this.mapper.toDomain(doc);
  }

  async update(
    id: string,
    data: Partial<Transaction>,
  ): Promise<Transaction | null> {
    const updateData: Record<string, unknown> = {};
    if (data.userId) updateData.userId = new Types.ObjectId(data.userId);
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.currency) updateData.currency = data.currency;
    if (data.provider) updateData.provider = data.provider;
    if (data.providerRefId) updateData.providerRefId = data.providerRefId;
    if (data.status) updateData.status = data.status;

    const doc = await this.transactionModel.findByIdAndUpdate(
      id,
      updateData as any,
      {
        new: true,
      },
    );
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await this.transactionModel.findByIdAndDelete(id);
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const docs = await this.transactionModel.find({
      userId: new Types.ObjectId(userId),
    });
    return this.mapper.toDomainArray(docs);
  }

  async findByStatus(status: string): Promise<Transaction[]> {
    const docs = await this.transactionModel.find({ status });
    return this.mapper.toDomainArray(docs);
  }

  async findByProviderRefId(
    providerRefId: string,
  ): Promise<Transaction | null> {
    const doc = await this.transactionModel.findOne({ providerRefId });
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async updateStatus(id: string, status: string): Promise<Transaction | null> {
    const doc = await this.transactionModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
