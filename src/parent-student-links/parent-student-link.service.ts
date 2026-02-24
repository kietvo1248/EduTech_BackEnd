import { Injectable } from '@nestjs/common';
import { ParentStudentLinkRepositoryAbstract } from './infrastructure/persistence/document/repositories/parent-student-link.repository.abstract';
import { ParentStudentLink } from './domain/parent-student-link';

@Injectable()
export class ParentStudentLinkService {
  constructor(
    private readonly parentStudentLinkRepository: ParentStudentLinkRepositoryAbstract,
  ) {}

  async createLink(
    data: Omit<ParentStudentLink, 'id' | 'createdAt'>,
  ): Promise<ParentStudentLink> {
    return this.parentStudentLinkRepository.create(data);
  }

  async getLinkById(id: string): Promise<ParentStudentLink | null> {
    return this.parentStudentLinkRepository.findById(id);
  }

  async getAllLinks(): Promise<ParentStudentLink[]> {
    return this.parentStudentLinkRepository.findAll();
  }

  async updateLink(
    id: string,
    data: Partial<ParentStudentLink>,
  ): Promise<ParentStudentLink | null> {
    return this.parentStudentLinkRepository.update(id, data);
  }

  async deleteLink(id: string): Promise<void> {
    return this.parentStudentLinkRepository.delete(id);
  }

  async getStudentsByParentId(parentId: string): Promise<ParentStudentLink[]> {
    return this.parentStudentLinkRepository.findByParentId(parentId);
  }

  async getParentsByStudentId(studentId: string): Promise<ParentStudentLink[]> {
    return this.parentStudentLinkRepository.findByStudentId(studentId);
  }

  async getLinkByParentAndStudent(
    parentId: string,
    studentId: string,
  ): Promise<ParentStudentLink | null> {
    return this.parentStudentLinkRepository.findByParentAndStudent(
      parentId,
      studentId,
    );
  }

  async getVerifiedStudentsByParentId(
    parentId: string,
  ): Promise<ParentStudentLink[]> {
    return this.parentStudentLinkRepository.findVerifiedByParentId(parentId);
  }

  async getVerifiedParentsByStudentId(
    studentId: string,
  ): Promise<ParentStudentLink[]> {
    return this.parentStudentLinkRepository.findVerifiedByStudentId(studentId);
  }

  async verifyLink(id: string): Promise<ParentStudentLink | null> {
    return this.updateLink(id, { isVerified: true });
  }

  async filterLinks(
    filters: Partial<ParentStudentLink>,
  ): Promise<ParentStudentLink[]> {
    const allLinks = await this.getAllLinks();
    return allLinks.filter((link) => {
      if (filters.parentId && link.parentId !== filters.parentId) return false;
      if (filters.studentId && link.studentId !== filters.studentId)
        return false;
      if (
        filters.isVerified !== undefined &&
        link.isVerified !== filters.isVerified
      )
        return false;
      return true;
    });
  }
}
