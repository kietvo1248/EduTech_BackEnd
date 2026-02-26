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
import { BaseRepositoryImpl } from '../../../../../core/base/base.repository.impl';

@Injectable()
export class SubjectRepository
  extends BaseRepositoryImpl<Subject, SubjectDocument, SubjectDocumentType>
  implements SubjectRepositoryAbstract
{
  constructor(
    @InjectModel(SubjectDocument.name)
    protected readonly model: Model<SubjectDocumentType>,
    protected readonly mapper: SubjectMapper,
  ) {
    super(model, mapper);
  }

  async findAllSubjects(): Promise<Subject[]> {
    const docs = await this.model.find();
    return this.mapper.toDomainArray(docs);
  }

  // Override create to ensure data structure
  async create(
    data: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Subject> {
    const doc = await this.model.create({
      name: data.name,
      slug: data.slug,
      iconUrl: data.iconUrl,
    });
    return this.mapper.toDomain(doc);
  }

  async findBySlug(slug: string): Promise<Subject | null> {
    const doc = await this.model.findOne({ slug });
    return doc ? this.mapper.toDomain(doc) : null;
  }
}
