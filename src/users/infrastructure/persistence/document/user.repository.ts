import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../domain/user';
import { UserRepositoryAbstract } from './repositories/user.repository.abstract';
import { UserDocument, UserDocumentType } from './schemas/user.schema';
import { UserMapper } from './mappers/user.mapper';
import { UserRole } from '../../../../enums';

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

  async update(id: string, user: Partial<User>): Promise<User> {
    const doc = await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
    if (!doc) {
      throw new NotFoundException('User not found');
    }
    return this.mapper.toDomain(doc);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
