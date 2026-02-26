import { Injectable } from '@nestjs/common';
import { HydratedDocument, SortOrder } from 'mongoose';
import { BaseService } from './base.service';
import { BaseRepository } from './base.repository';

/**
 * Base CRUD service with common operations
 *
 * @template TDomain - Domain model type
 * @template TDocument - Mongoose document class type
 * @template TDocumentType - Hydrated document type
 */
@Injectable()
export abstract class BaseCrudService<
  TDomain,
  TDocument,
  TDocumentType extends HydratedDocument<TDocument>,
> extends BaseService {
  protected constructor(
    protected readonly repository: BaseRepository<
      TDomain,
      TDocument,
      TDocumentType
    >,
  ) {
    super();
  }

  // CREATE
  async create(entity: Partial<TDomain>): Promise<TDomain> {
    return this.repository.create(entity);
  }

  // READ
  async findById(id: string): Promise<TDomain | null> {
    return this.repository.findById(id);
  }

  async findAll(
    limit?: number,
    offset?: number,
  ): Promise<[TDomain[], number]> {
    return this.repository.findAll(limit, offset);
  }

  async findByFilter(
    filter: Record<string, unknown>,
    sort?: Record<string, SortOrder | { $meta: 'textScore' }>,
  ): Promise<TDomain[]> {
    return this.repository.findByFilter(filter, sort);
  }

  async findByFilterWithPagination(
    filter: Record<string, unknown>,
    sort: Record<string, SortOrder | { $meta: 'textScore' }>,
    skip: number,
    limit: number,
  ): Promise<TDomain[]> {
    return this.repository.findByFilterWithPagination(filter, sort, skip, limit);
  }

  // UPDATE
  async update(id: string, entity: Partial<TDomain>): Promise<TDomain | null> {
    return this.repository.update(id, entity);
  }

  // DELETE
  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async softDelete(id: string, deletedAt?: Date): Promise<void> {
    return this.repository.softDelete(id, deletedAt);
  }

  async restore(id: string): Promise<TDomain | null> {
    return this.repository.restore(id);
  }

  // UTILITIES
  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }

  async exists(id: string): Promise<boolean> {
    return this.repository.exists(id);
  }
}
