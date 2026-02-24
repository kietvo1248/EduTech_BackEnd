import { Injectable } from '@nestjs/common';
import { SubjectRepositoryAbstract } from './infrastructure/persistence/document/repositories/subject.repository.abstract';
import { Subject } from './domain/subject';

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepository: SubjectRepositoryAbstract) {}

  async createSubject(
    data: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Subject> {
    return this.subjectRepository.create(data);
  }

  async getSubjectById(id: string): Promise<Subject | null> {
    return this.subjectRepository.findById(id);
  }

  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectRepository.findAll();
  }

  async updateSubject(
    id: string,
    data: Partial<Subject>,
  ): Promise<Subject | null> {
    return this.subjectRepository.update(id, data);
  }

  async deleteSubject(id: string): Promise<void> {
    return this.subjectRepository.delete(id);
  }

  async findBySlug(slug: string): Promise<Subject | null> {
    return this.subjectRepository.findBySlug(slug);
  }
}
