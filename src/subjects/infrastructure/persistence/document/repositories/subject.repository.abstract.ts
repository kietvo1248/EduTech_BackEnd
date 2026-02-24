import { Subject } from '../../../../domain/subject';

export abstract class SubjectRepositoryAbstract {
  abstract findById(id: string): Promise<Subject | null>;
  abstract findAll(): Promise<Subject[]>;
  abstract create(data: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subject>;
  abstract update(id: string, data: Partial<Subject>): Promise<Subject | null>;
  abstract delete(id: string): Promise<void>;
  abstract findBySlug(slug: string): Promise<Subject | null>;
}
