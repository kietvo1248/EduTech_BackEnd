import { ParentProfile } from '../../../../domain/parent-profile';

export abstract class ParentProfileRepositoryAbstract {
  abstract findById(id: string): Promise<ParentProfile | null>;
  abstract findAll(): Promise<ParentProfile[]>;
  abstract create(data: Omit<ParentProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<ParentProfile>;
  abstract update(id: string, data: Partial<ParentProfile>): Promise<ParentProfile | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<ParentProfile | null>;
  abstract findByPhoneNumber(phoneNumber: string): Promise<ParentProfile | null>;
}
