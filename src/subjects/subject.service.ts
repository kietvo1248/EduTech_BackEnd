import { Injectable, NotFoundException } from '@nestjs/common';
import { SortOrder } from 'mongoose';
import { SubjectRepositoryAbstract } from './infrastructure/persistence/document/repositories/subject.repository.abstract';
import { Subject } from './domain/subject';
import { BaseCrudService } from '../core/base/base.crud.service';
import {
  SubjectDocument,
  SubjectDocumentType,
} from './infrastructure/persistence/document/schemas/subject.schema';
import { QuerySubjectDto } from './dto';

@Injectable()
export class SubjectService extends BaseCrudService<
  Subject,
  SubjectDocument,
  SubjectDocumentType
> {
  constructor(protected readonly subjectRepository: SubjectRepositoryAbstract) {
    super(subjectRepository);
  }

  // Custom methods specific to Subject domain

  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectRepository.findAllSubjects();
  }

  async getAllSubjectsWithFilter(query: QuerySubjectDto): Promise<{
    subjects: Subject[];
    total: number;
  }> {
    const { search, sortBy, sortOrder, page, limit } = query;

    // Build filter
    const filter: Record<string, unknown> = {};
    if (search) {
      filter['$or'] = [
        { name: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort
    const sort: Record<string, SortOrder | { $meta: 'textScore' }> = {};
    if (sortBy) {
      sort[sortBy] = (sortOrder === 'desc' ? -1 : 1) as SortOrder;
    } else {
      sort['createdAt'] = -1 as SortOrder;
    }

    // Get total count
    const total = await this.count(filter);

    // Get subjects with pagination
    let subjects: Subject[];
    if (page && limit) {
      const skip = this.calculateSkip(page, limit);
      subjects = await this.findByFilterWithPagination(
        filter,
        sort,
        skip,
        limit,
      );
    } else {
      subjects = await this.findByFilter(filter, sort);
    }

    return { subjects, total };
  }

  async getSubjectById(id: string): Promise<Subject> {
    const subject = await this.findById(id);
    if (!subject) {
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    return subject;
  }

  async findBySlug(slug: string): Promise<Subject | null> {
    return this.subjectRepository.findBySlug(slug);
  }

  async getSubjectBySlug(slug: string): Promise<Subject> {
    const subject = await this.findBySlug(slug);
    if (!subject) {
      throw new NotFoundException(`Subject with slug ${slug} not found`);
    }
    return subject;
  }

  async createSubject(
    data: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Subject> {
    return this.create(data);
  }

  async updateSubject(id: string, data: Partial<Subject>): Promise<Subject> {
    const updated = await this.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    return updated;
  }

  async deleteSubject(id: string): Promise<void> {
    const subject = await this.findById(id);
    if (!subject) {
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    await this.delete(id);
  }

  async softDeleteSubject(id: string): Promise<void> {
    const subject = await this.findById(id);
    if (!subject) {
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    await this.softDelete(id);
  }

  async restoreSubject(id: string): Promise<Subject> {
    const restored = await this.restore(id);
    if (!restored) {
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    return restored;
  }
}
