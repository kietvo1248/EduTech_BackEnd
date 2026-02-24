import { StudentProfile } from '../../../../domain/student-profile';

export abstract class StudentProfileRepositoryAbstract {
  abstract findById(id: string): Promise<StudentProfile | null>;
  abstract findAll(): Promise<StudentProfile[]>;
  abstract create(data: Omit<StudentProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<StudentProfile>;
  abstract update(id: string, data: Partial<StudentProfile>): Promise<StudentProfile | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<StudentProfile | null>;
}
