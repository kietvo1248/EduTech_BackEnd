import { Injectable } from '@nestjs/common';
import { StudentProfileRepositoryAbstract } from './infrastructure/persistence/document/repositories/student-profile.repository.abstract';
import { StudentProfile } from './domain/student-profile';

@Injectable()
export class StudentProfileService {
  constructor(
    private readonly studentProfileRepository: StudentProfileRepositoryAbstract,
  ) {}

  async createProfile(
    data: Omit<StudentProfile, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<StudentProfile> {
    return this.studentProfileRepository.create(data);
  }

  async getProfileById(id: string): Promise<StudentProfile | null> {
    return this.studentProfileRepository.findById(id);
  }

  async getProfileByUserId(userId: string): Promise<StudentProfile | null> {
    return this.studentProfileRepository.findByUserId(userId);
  }

  async getAllProfiles(): Promise<StudentProfile[]> {
    return this.studentProfileRepository.findAll();
  }

  async updateProfile(
    id: string,
    data: Partial<StudentProfile>,
  ): Promise<StudentProfile | null> {
    return this.studentProfileRepository.update(id, data);
  }

  async deleteProfile(id: string): Promise<void> {
    return this.studentProfileRepository.delete(id);
  }

  async addXp(id: string, xp: number): Promise<StudentProfile | null> {
    const profile = await this.getProfileById(id);
    if (!profile) return null;
    return this.updateProfile(id, {
      ...profile,
      xpTotal: profile.xpTotal + xp,
    });
  }

  async addDiamonds(
    id: string,
    diamonds: number,
  ): Promise<StudentProfile | null> {
    const profile = await this.getProfileById(id);
    if (!profile) return null;
    return this.updateProfile(id, {
      ...profile,
      diamondBalance: profile.diamondBalance + diamonds,
    });
  }

  async updateStreak(
    id: string,
    streak: number,
  ): Promise<StudentProfile | null> {
    const profile = await this.getProfileById(id);
    if (!profile) return null;
    return this.updateProfile(id, { ...profile, currentStreak: streak });
  }
}
