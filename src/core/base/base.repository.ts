import {
  Model,
  HydratedDocument,
  UpdateQuery,
  RootFilterQuery,
} from 'mongoose';

/**
 * Base repository abstract class with common repository patterns for MongoDB/Mongoose
 *
 * @template TDomain - Domain model type (e.g., User)
 * @template TDocument - Mongoose document class type (e.g., UserDocument)
 * @template TDocumentType - Hydrated document type (e.g., UserDocumentType)
 */
export abstract class BaseRepository<
  TDomain,
  TDocument,
  TDocumentType extends HydratedDocument<TDocument>,
> {
  protected abstract model: Model<TDocumentType>;
  protected abstract mapper: {
    toDomain(document: TDocumentType): TDomain;
    toDomainArray(documents: TDocumentType[]): TDomain[];
    toDocument?(domain: Partial<TDomain>): Partial<TDocument>;
  };

  /**
   * Find entity by ID
   */
  async findById(id: string): Promise<TDomain | null> {
    const doc = await this.model.findById(id).exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }

  /**
   * Find all entities with pagination
   * @param limit - Number of items to return (default: 10)
   * @param offset - Number of items to skip (default: 0)
   * @returns Tuple of [items, total count]
   */
  async findAll(
    limit: number = 10,
    offset: number = 0,
  ): Promise<[TDomain[], number]> {
    const [docs, total] = await Promise.all([
      this.model
        .find()
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .exec(),
      this.model.countDocuments().exec(),
    ]);
    return [this.mapper.toDomainArray(docs), total];
  }

  /**
   * Create new entity
   * @param entity - Partial domain entity to create
   * @returns Created domain entity
   */
  async create(entity: Partial<TDomain>): Promise<TDomain> {
    const documentData = this.mapper.toDocument
      ? this.mapper.toDocument(entity)
      : entity;
    const created = await this.model.create(documentData as any);
    return this.mapper.toDomain(created);
  }

  /**
   * Update entity by ID
   * @param id - Entity ID
   * @param entity - Partial domain entity with updates
   * @returns Updated domain entity or null if not found
   */
  async update(id: string, entity: Partial<TDomain>): Promise<TDomain | null> {
    const documentData = this.mapper.toDocument
      ? this.mapper.toDocument(entity)
      : entity;
    const doc = await this.model
      .findByIdAndUpdate(id, documentData as UpdateQuery<TDocumentType>, {
        new: true,
      })
      .exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }

  /**
   * Delete entity by ID
   * @param id - Entity ID
   */
  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  /**
   * Count documents matching filter
   * @param filter - MongoDB filter object
   * @returns Number of matching documents
   */
  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.model
      .countDocuments(filter as RootFilterQuery<TDocumentType>)
      .exec();
  }

  /**
   * Check if document exists by ID
   * @param id - Entity ID
   * @returns true if exists, false otherwise
   */
  async exists(id: string): Promise<boolean> {
    const count = await this.model
      .countDocuments({ _id: id } as RootFilterQuery<TDocumentType>)
      .exec();
    return count > 0;
  }
}
