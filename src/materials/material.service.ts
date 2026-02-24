import { Injectable } from '@nestjs/common';
import { MaterialRepositoryAbstract } from './infrastructure/persistence/document/repositories/material.repository.abstract';
import { Material } from './domain/material';

@Injectable()
export class MaterialService {
  constructor(private readonly materialRepository: MaterialRepositoryAbstract) {}

  async createMaterial(data: Omit<Material, 'id' | 'createdAt' | 'updatedAt'>): Promise<Material> {
    return this.materialRepository.create(data);
  }

  async getMaterialById(id: string): Promise<Material | null> {
    return this.materialRepository.findById(id);
  }

  async getAllMaterials(): Promise<Material[]> {
    return this.materialRepository.findAll();
  }

  async updateMaterial(id: string, data: Partial<Material>): Promise<Material | null> {
    return this.materialRepository.update(id, data);
  }

  async deleteMaterial(id: string): Promise<void> {
    return this.materialRepository.delete(id);
  }

  async findByLessonId(lessonId: string): Promise<Material[]> {
    return this.materialRepository.findByLessonId(lessonId);
  }
}
