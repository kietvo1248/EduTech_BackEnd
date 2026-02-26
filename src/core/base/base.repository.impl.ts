import { Injectable } from '@nestjs/common';
import { Model, HydratedDocument } from 'mongoose';
import { BaseRepository } from './base.repository';

/**
 * Concrete implementation of BaseRepository for MongoDB/Mongoose
 * This can be used when you need a simple repository without custom methods
 *
 * @template TDomain - Domain model type
 * @template TDocument - Mongoose document class type
 * @template TDocumentType - Hydrated document type
 */
@Injectable()
export class BaseRepositoryImpl<
  TDomain,
  TDocument,
  TDocumentType extends HydratedDocument<TDocument>,
> extends BaseRepository<TDomain, TDocument, TDocumentType> {
  constructor(
    protected model: Model<TDocumentType>,
    protected mapper: {
      toDomain(document: TDocumentType): TDomain;
      toDomainArray(documents: TDocumentType[]): TDomain[];
      toDocument?(domain: Partial<TDomain>): Partial<TDocument>;
    },
  ) {
    super();
  }
}
