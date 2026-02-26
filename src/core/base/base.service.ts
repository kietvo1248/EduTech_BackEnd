import { Injectable } from '@nestjs/common';

/**
 * Pagination result interface
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/**
 * Filter and sort result interface
 */
export interface FilteredResult<T> {
  items: T[];
  total: number;
}

/**
 * Base service class with common service patterns
 */
@Injectable()
export abstract class BaseService {
  /**
   * Build pagination metadata
   * @param items - Array of items
   * @param total - Total count of items
   * @param page - Current page number
   * @param limit - Items per page
   * @returns Paginated result with metadata
   */
  buildPaginationMeta<T>(
    items: T[],
    total: number,
    page: number,
    limit: number,
  ): PaginatedResult<T> {
    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Build filter result with total count
   * @param items - Array of items
   * @param total - Total count of items
   * @returns Filtered result with total
   */
  buildFilteredResult<T>(items: T[], total: number): FilteredResult<T> {
    return {
      items,
      total,
    };
  }

  /**
   * Calculate pagination skip value
   * @param page - Page number (1-indexed)
   * @param limit - Items per page
   * @returns Number of items to skip
   */
  calculateSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  /**
   * Validate pagination parameters
   * @param page - Page number
   * @param limit - Items per page
   * @throws Error if parameters are invalid
   */
  validatePagination(page: number, limit: number): void {
    if (page < 1) {
      throw new Error('Page must be greater than 0');
    }
    if (limit < 1) {
      throw new Error('Limit must be greater than 0');
    }
    if (limit > 100) {
      throw new Error('Limit must not exceed 100');
    }
  }
}
