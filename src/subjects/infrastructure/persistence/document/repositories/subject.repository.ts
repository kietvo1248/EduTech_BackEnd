import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SubjectDocument,
  SubjectDocumentType,
} from '../schemas/subject.schema';
import { SubjectRepositoryAbstract } from './subject.repository.abstract';
import { SubjectMapper } from '../mappers/subject.mapper';
import { Subject } from '../../../../domain/subject';

@Injectable()
export class SubjectRepository implements SubjectRepositoryAbstract {
  constructor(
    @InjectModel(SubjectDocument.name)
    private readonly subjectModel: Model<SubjectDocumentType>,
    private readonly mapper: SubjectMapper,
  ) {}

  async findById(id: string): Promise<Subject | null> {
    const doc = await this.subjectModel.findById(id);
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Subject[]> {
    const docs = await this.subjectModel.find();
    return this.mapper.toDomainArray(docs);
  }

  async create(
    data: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Subject> {
    const doc = await this.subjectModel.create({
      name: data.name,
      slug: data.slug,
      iconUrl: data.iconUrl,
    });
    return this.mapper.toDomain(doc);
  }

  async update(id: string, data: Partial<Subject>): Promise<Subject | null> {
    const updateData: Record<string, unknown> = {};
    if (data.name) updateData.name = data.name;
    if (data.slug) updateData.slug = data.slug;
    if (data.iconUrl) updateData.iconUrl = data.iconUrl;

    const doc = await this.subjectModel.findByIdAndUpdate(
      id,
      updateData as any,
      {
        new: true,
      },
    );
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await this.subjectModel.findByIdAndDelete(id);
  }

  async findBySlug(slug: string): Promise<Subject | null> {
    const doc = await this.subjectModel.findOne({ slug });
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
