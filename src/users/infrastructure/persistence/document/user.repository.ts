import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../domain/user';
import { UserRepositoryAbstract } from './repositories/user.repository.abstract';
import { UserDocument, UserDocumentType } from './schemas/user.schema';
import { UserMapper } from './mappers/user.mapper';
import { UserRole, EmailVerificationStatus } from '../../../../enums';

@Injectable()
export class UserRepository extends UserRepositoryAbstract {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocumentType>,
    private readonly mapper: UserMapper,
  ) {
    super();
  }

  async create(user: Partial<User>): Promise<User> {
    const created = await this.userModel.create({
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role ?? UserRole.Student,
      avatarUrl: user.avatarUrl ?? null,
      isActive: user.isActive ?? true,
      emailVerificationStatus:
        user.emailVerificationStatus ?? EmailVerificationStatus.Pending,
      emailVerificationToken: user.emailVerificationToken ?? null,
      emailVerificationExpires: user.emailVerificationExpires ?? null,
    });
    return this.mapper.toDomain(created);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.userModel.findById(id).exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAll(limit = 10, offset = 0): Promise<[User[], number]> {
    const [docs, total] = await Promise.all([
      this.userModel
        .find()
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments().exec(),
    ]);
    return [this.mapper.toDomainArray(docs), total];
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updateData: Record<string, unknown> = {};
    if (user.passwordHash !== undefined)
      updateData.passwordHash = user.passwordHash;
    if (user.role !== undefined) updateData.role = user.role;
    if (user.avatarUrl !== undefined) updateData.avatarUrl = user.avatarUrl;
    if (user.isActive !== undefined) updateData.isActive = user.isActive;
    if (user.emailVerificationStatus !== undefined)
      updateData.emailVerificationStatus = user.emailVerificationStatus;
    if (user.emailVerificationToken !== undefined)
      updateData.emailVerificationToken = user.emailVerificationToken;
    if (user.emailVerificationExpires !== undefined)
      updateData.emailVerificationExpires = user.emailVerificationExpires;

    const doc = await this.userModel
      .findByIdAndUpdate(id, updateData as any, { new: true })
      .exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findByVerificationToken(token: string): Promise<User | null> {
    const doc = await this.userModel
      .findOne({ emailVerificationToken: token })
      .exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
