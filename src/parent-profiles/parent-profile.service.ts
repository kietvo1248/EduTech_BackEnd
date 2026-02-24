import { Injectable } from '@nestjs/common';
import { ParentProfileRepositoryAbstract } from './infrastructure/persistence/document/repositories/parent-profile.repository.abstract';
import { ParentProfile } from './domain/parent-profile';

@Injectable()
export class ParentProfileService {
  constructor(
    private readonly parentProfileRepository: ParentProfileRepositoryAbstract,
  ) {}

  async createProfile(
    data: Omit<ParentProfile, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ParentProfile> {
    return this.parentProfileRepository.create(data);
  }

  async getProfileById(id: string): Promise<ParentProfile | null> {
    return this.parentProfileRepository.findById(id);
  }

  async getProfileByUserId(userId: string): Promise<ParentProfile | null> {
    return this.parentProfileRepository.findByUserId(userId);
  }

  async getProfileByPhoneNumber(
    phoneNumber: string,
  ): Promise<ParentProfile | null> {
    return this.parentProfileRepository.findByPhoneNumber(phoneNumber);
  }

  async getAllProfiles(): Promise<ParentProfile[]> {
    return this.parentProfileRepository.findAll();
  }

  async updateProfile(
    id: string,
    data: Partial<ParentProfile>,
  ): Promise<ParentProfile | null> {
    return this.parentProfileRepository.update(id, data);
  }

  async deleteProfile(id: string): Promise<void> {
    return this.parentProfileRepository.delete(id);
  }

  async filterProfiles(
    filters: Partial<ParentProfile>,
  ): Promise<ParentProfile[]> {
    const allProfiles = await this.getAllProfiles();
    return allProfiles.filter((profile) => {
      if (filters.fullName && !profile.fullName.includes(filters.fullName))
        return false;
      if (filters.phoneNumber && profile.phoneNumber !== filters.phoneNumber)
        return false;
      if (filters.userId && profile.userId !== filters.userId) return false;
      return true;
    });
  }
}
