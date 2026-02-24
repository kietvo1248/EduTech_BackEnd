import { Transaction } from '../../../../domain/transaction';

export abstract class TransactionRepositoryAbstract {
  abstract findById(id: string): Promise<Transaction | null>;
  abstract findAll(): Promise<Transaction[]>;
  abstract create(
    data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Transaction>;
  abstract update(
    id: string,
    data: Partial<Transaction>,
  ): Promise<Transaction | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<Transaction[]>;
  abstract findByStatus(status: string): Promise<Transaction[]>;
  abstract findByProviderRefId(
    providerRefId: string,
  ): Promise<Transaction | null>;
  abstract updateStatus(
    id: string,
    status: string,
  ): Promise<Transaction | null>;
}
