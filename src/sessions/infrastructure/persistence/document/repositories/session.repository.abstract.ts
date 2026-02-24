import { Session } from '../../../../domain/session';

export abstract class SessionRepositoryAbstract {
  abstract findById(id: string): Promise<Session | null>;
  abstract findAll(): Promise<Session[]>;
  abstract create(data: Omit<Session, 'id' | 'createdAt'>): Promise<Session>;
  abstract update(id: string, data: Partial<Session>): Promise<Session | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(userId: string): Promise<Session[]>;
  abstract deleteByUserId(userId: string): Promise<void>;
  abstract findByUserIdAndToken(
    userId: string,
    hashedRt: string,
  ): Promise<Session | null>;
}
