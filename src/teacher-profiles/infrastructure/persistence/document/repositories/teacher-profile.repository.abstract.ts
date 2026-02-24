import { TeacherProfile } from '../../../../domain/teacher-profile';

export abstract class TeacherProfileRepositoryAbstract {
  abstract findById(id: string): Promise<TeacherProfile | null>;
  abstract findAll(): Promise<TeacherProfile[]>;
  abstract create(data: Omit<TeacherProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeacherProfile>;
  abstract update(id: string, data: Partial<TeacherProfile>): Promise<TeacherProfile | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<TeacherProfile | null>;
}
