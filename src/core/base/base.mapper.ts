import { Injectable } from '@nestjs/common';

/**
 * Base mapper abstract class for converting between domain models and database documents
 *
 * @template TDomain - Domain model type (e.g., Course)
 * @template TDocument - Database document type (e.g., CourseDocumentType)
 */
@Injectable()
export abstract class BaseMapper<TDomain, TDocument> {
  /**
   * Convert a single document to domain model
   * @param doc - Database document
   * @returns Domain model
   */
  abstract toDomain(doc: TDocument): TDomain;

  /**
   * Convert array of documents to domain models
   * @param docs - Array of database documents
   * @returns Array of domain models
   */
  toDomainArray(docs: TDocument[]): TDomain[] {
    return docs.map((doc) => this.toDomain(doc));
  }

  /**
   * Optional: Convert domain model to document (for create/update operations)
   * Override this method if you need custom mapping for write operations
   * @param domain - Domain model
   * @returns Document representation
   */
  toDocument?(domain: Partial<TDomain>): Partial<TDocument>;
}
