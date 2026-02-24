import { Injectable } from '@nestjs/common';
import { Transaction } from '../../../../domain/transaction';
import { TransactionDocumentType } from '../schemas/transaction.schema';

@Injectable()
export class TransactionMapper {
  toDomain(doc: TransactionDocumentType): Transaction {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      amount: doc.amount,
      currency: doc.currency,
      provider: doc.provider,
      providerRefId: doc.providerRefId,
      status: doc.status,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: TransactionDocumentType[]): Transaction[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
