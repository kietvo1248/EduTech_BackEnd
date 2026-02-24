import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SessionDocument, SessionDocumentType } from '../schemas/session.schema';
import { SessionRepositoryAbstract } from './session.repository.abstract';
import { SessionMapper } from '../mappers/session.mapper';
import { Session } from '../../../../domain/session';

@Injectable()
export class SessionRepository implements SessionRepositoryAbstract {
  constructor(
    @InjectModel(SessionDocument.name)
    private readonly sessionModel: Model<SessionDocumentType>,
    private readonly mapper: SessionMapper,
  ) {}

  async findById(id: string): Promise<Session | null> {
    const doc = await this.sessionModel.findById(id);
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Session[]> {
    const docs = await this.sessionModel.find();
    return this.mapper.toDomainArray(docs);
  }

  async create(data: Omit<Session, 'id' | 'createdAt'>): Promise<Session> {
    const doc = await this.sessionModel.create({
      userId: new Types.ObjectId(data.userId),
      hashedRt: data.hashedRt,
      deviceInfo: data.deviceInfo,
      ipAddress: data.ipAddress,
      expiresAt: data.expiresAt,
    });
    return this.mapper.toDomain(doc);
  }

  async update(id: string, data: Partial<Session>): Promise<Session | null> {
    const updateData: any = {};
    if (data.userId) updateData.userId = new Types.ObjectId(data.userId);
    if (data.hashedRt) updateData.hashedRt = data.hashedRt;
    if (data.deviceInfo) updateData.deviceInfo = data.deviceInfo;
    if (data.ipAddress) updateData.ipAddress = data.ipAddress;
    if (data.expiresAt) updateData.expiresAt = data.expiresAt;

    const doc = await this.sessionModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await this.sessionModel.findByIdAndDelete(id);
  }

  async findByUserId(userId: string): Promise<Session[]> {
    const docs = await this.sessionModel.find({
      userId: new Types.ObjectId(userId),
    });
    return this.mapper.toDomainArray(docs);
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.sessionModel.deleteMany({
      userId: new Types.ObjectId(userId),
    });
  }

  async findByUserIdAndToken(userId: string, hashedRt: string): Promise<Session | null> {
    const doc = await this.sessionModel.findOne({
      userId: new Types.ObjectId(userId),
      hashedRt,
    });
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
