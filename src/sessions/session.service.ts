import { Injectable } from '@nestjs/common';
import { SessionRepositoryAbstract } from './infrastructure/persistence/document/repositories/session.repository.abstract';
import { Session } from './domain/session';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepositoryAbstract) {}

  async createSession(data: Omit<Session, 'id' | 'createdAt'>): Promise<Session> {
    return this.sessionRepository.create(data);
  }

  async findSessionById(id: string): Promise<Session | null> {
    return this.sessionRepository.findById(id);
  }

  async findSessionsByUserId(userId: string): Promise<Session[]> {
    return this.sessionRepository.findByUserId(userId);
  }

  async deleteSession(id: string): Promise<void> {
    return this.sessionRepository.delete(id);
  }

  async deleteSessionsByUserId(userId: string): Promise<void> {
    return this.sessionRepository.deleteByUserId(userId);
  }

  async updateSession(id: string, data: Partial<Session>): Promise<Session | null> {
    return this.sessionRepository.update(id, data);
  }

  async validateRefreshToken(userId: string, hashedRt: string): Promise<Session | null> {
    return this.sessionRepository.findByUserIdAndToken(userId, hashedRt);
  }
}
