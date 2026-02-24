import { Injectable } from '@nestjs/common';
import { TransactionRepositoryAbstract } from './infrastructure/persistence/document/repositories/transaction.repository.abstract';
import { Transaction } from './domain/transaction';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepositoryAbstract) {}

  async recordTransaction(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    return this.transactionRepository.create(data);
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    return this.transactionRepository.findById(id);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  async updateTransaction(id: string, data: Partial<Transaction>): Promise<Transaction | null> {
    return this.transactionRepository.update(id, data);
  }

  async deleteTransaction(id: string): Promise<void> {
    return this.transactionRepository.delete(id);
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionRepository.findByUserId(userId);
  }

  async findByStatus(status: string): Promise<Transaction[]> {
    return this.transactionRepository.findByStatus(status);
  }

  async findByProviderRefId(providerRefId: string): Promise<Transaction | null> {
    return this.transactionRepository.findByProviderRefId(providerRefId);
  }

  async updateTransactionStatus(id: string, status: string): Promise<Transaction | null> {
    return this.transactionRepository.updateStatus(id, status);
  }
}
