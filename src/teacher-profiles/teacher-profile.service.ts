import { Injectable } from '@nestjs/common';
import { TeacherProfileRepositoryAbstract } from './infrastructure/persistence/document/repositories/teacher-profile.repository.abstract';
import { TeacherProfile } from './domain/teacher-profile';

@Injectable()
export class TeacherProfileService {
  constructor(private readonly teacherProfileRepository: TeacherProfileRepositoryAbstract) {}

  async createProfile(data: Omit<TeacherProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeacherProfile> {
    return this.teacherProfileRepository.create(data);
  }

  async getProfileById(id: string): Promise<TeacherProfile | null> {
    return this.teacherProfileRepository.findById(id);
  }

  async getProfileByUserId(userId: string): Promise<TeacherProfile | null> {
    return this.teacherProfileRepository.findByUserId(userId);
  }

  async getAllProfiles(): Promise<TeacherProfile[]> {
    return this.teacherProfileRepository.findAll();
  }

  async updateProfile(id: string, data: Partial<TeacherProfile>): Promise<TeacherProfile | null> {
    return this.teacherProfileRepository.update(id, data);
  }

  async deleteProfile(id: string): Promise<void> {
    return this.teacherProfileRepository.delete(id);
  }

  async updateBio(id: string, bio: string): Promise<TeacherProfile | null> {
    return this.updateProfile(id, { bio });
  }
}
