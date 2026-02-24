import { Injectable } from '@nestjs/common';
import { GradeLevelRepositoryAbstract } from './infrastructure/persistence/document/repositories/grade-level.repository.abstract';
import { GradeLevel } from './domain/grade-level';

@Injectable()
export class GradeLevelService {
  constructor(private readonly gradeLevelRepository: GradeLevelRepositoryAbstract) {}

  async createGradeLevel(data: Omit<GradeLevel, 'id' | 'createdAt' | 'updatedAt'>): Promise<GradeLevel> {
    return this.gradeLevelRepository.create(data);
  }

  async getGradeLevelById(id: string): Promise<GradeLevel | null> {
    return this.gradeLevelRepository.findById(id);
  }

  async getAllGradeLevels(): Promise<GradeLevel[]> {
    return this.gradeLevelRepository.findAll();
  }

  async updateGradeLevel(id: string, data: Partial<GradeLevel>): Promise<GradeLevel | null> {
    return this.gradeLevelRepository.update(id, data);
  }

  async deleteGradeLevel(id: string): Promise<void> {
    return this.gradeLevelRepository.delete(id);
  }

  async findByValue(value: number): Promise<GradeLevel | null> {
    return this.gradeLevelRepository.findByValue(value);
  }
}
