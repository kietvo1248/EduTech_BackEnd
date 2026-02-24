import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './domain/user';
import { UserRepositoryAbstract } from './infrastructure/persistence/document/repositories/user.repository.abstract';
import { UserRole } from '../enums';
import { BaseService } from '../core/base/base.service';

@Injectable()
export class UsersService extends BaseService {
  constructor(private readonly userRepository: UserRepositoryAbstract) {
    super();
  }

  async create(dto: CreateUserDto | Record<string, unknown>): Promise<User> {
    return this.userRepository.create({
      email: (dto as any).email,
      passwordHash: (dto as any).passwordHash || (dto as any).password,
      role: (dto as any).role ?? UserRole.Student,
      avatarUrl: (dto as any).avatarUrl ?? null,
      isActive: (dto as any).isActive ?? true,
      emailVerificationStatus: (dto as any).emailVerificationStatus,
      emailVerificationToken: (dto as any).emailVerificationToken,
      emailVerificationExpires: (dto as any).emailVerificationExpires,
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findByVerificationToken(token: string): Promise<User | null> {
    return this.userRepository.findByVerificationToken(token);
  }

  async findAll(limit?: number, offset?: number): Promise<[User[], number]> {
    return this.userRepository.findAll(limit ?? 10, offset ?? 0);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.update(id, dto);
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  async upsertSocialUser(payload: {
    provider: string;
    providerId: string;
    email?: string | null;
    displayName?: string | null;
    avatarUrl?: string | null;
  }): Promise<User> {
    // Try to find existing user by email
    if (payload.email) {
      const existingByEmail = await this.findByEmail(payload.email);
      if (existingByEmail) {
        // Update avatar if provided
        if (payload.avatarUrl && !existingByEmail.avatarUrl) {
          await this.userRepository.update(existingByEmail.id, {
            avatarUrl: payload.avatarUrl,
            isActive: true,
          });
          return (await this.findById(existingByEmail.id)) as User;
        }
        return existingByEmail;
      }
    }

    // Create new user for social login
    return this.userRepository.create({
      email: payload.email ?? `${payload.providerId}@${payload.provider}.local`,
      passwordHash: null, // Social users don't have password
      role: UserRole.Student,
      avatarUrl: payload.avatarUrl ?? null,
      isActive: true,
    });
  }
}
