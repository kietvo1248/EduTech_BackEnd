import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery } from 'mongoose';
import {
  ChapterDocument,
  ChapterDocumentType,
} from '../schemas/chapter.schema';
import { ChapterRepositoryAbstract } from './chapter.repository.abstract';
import { ChapterMapper } from '../mappers/chapter.mapper';
import { Chapter } from '../../../../domain/chapter';

@Injectable()
export class ChapterRepository implements ChapterRepositoryAbstract {
  constructor(
    @InjectModel(ChapterDocument.name)
    private readonly chapterModel: Model<ChapterDocumentType>,
    private readonly mapper: ChapterMapper,
  ) {}

  async findById(id: string): Promise<Chapter | null> {
    const doc = await this.chapterModel.findById(id);
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Chapter[]> {
    const docs = await this.chapterModel.find().sort({ orderIndex: 1 });
    return this.mapper.toDomainArray(docs);
  }

  async create(
    data: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Chapter> {
    const doc = await this.chapterModel.create({
      courseId: new Types.ObjectId(data.courseId),
      title: data.title,
      orderIndex: data.orderIndex,
    });
    return this.mapper.toDomain(doc);
  }

  async update(id: string, data: Partial<Chapter>): Promise<Chapter | null> {
    const updateData: Record<string, unknown> = {};
    if (data.courseId) updateData.courseId = new Types.ObjectId(data.courseId);
    if (data.title) updateData.title = data.title;
    if (data.orderIndex !== undefined) updateData.orderIndex = data.orderIndex;

    const doc = await this.chapterModel.findByIdAndUpdate(
      id,
      updateData as UpdateQuery<ChapterDocumentType>,
      {
        new: true,
      },
    );
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await this.chapterModel.findByIdAndDelete(id);
  }

  async findByCourseId(courseId: string): Promise<Chapter[]> {
    const docs = await this.chapterModel
      .find({
        courseId: new Types.ObjectId(courseId),
      })
      .sort({ orderIndex: 1 });
    return this.mapper.toDomainArray(docs);
  }

  async reorderChapters(
    courseId: string,
    chapters: Array<{ id: string; orderIndex: number }>,
  ): Promise<Chapter[]> {
    for (const chapter of chapters) {
      await this.chapterModel.findByIdAndUpdate(
        chapter.id,
        { orderIndex: chapter.orderIndex },
        { new: true },
      );
    }
    return this.findByCourseId(courseId);
  }
}
