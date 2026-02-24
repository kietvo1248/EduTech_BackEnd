import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CourseDocument, CourseDocumentType } from '../schemas/course.schema';
import { CourseRepositoryAbstract } from './course.repository.abstract';
import { CourseMapper } from '../mappers/course.mapper';
import { Course } from '../../../../domain/course';

@Injectable()
export class CourseRepository implements CourseRepositoryAbstract {
  constructor(
    @InjectModel(CourseDocument.name)
    private readonly courseModel: Model<CourseDocumentType>,
    private readonly mapper: CourseMapper,
  ) {}

  async findById(id: string): Promise<Course | null> {
    const doc = await this.courseModel.findById(id);
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Course[]> {
    const docs = await this.courseModel.find();
    return this.mapper.toDomainArray(docs);
  }

  async create(
    data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Course> {
    const doc = await this.courseModel.create({
      subjectId: new Types.ObjectId(data.subjectId),
      gradeLevelId: new Types.ObjectId(data.gradeLevelId),
      authorId: new Types.ObjectId(data.authorId),
      title: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      isPublished: data.isPublished,
      isPro: data.isPro,
    });
    return this.mapper.toDomain(doc);
  }

  async update(id: string, data: Partial<Course>): Promise<Course | null> {
    const updateData: Record<string, unknown> = {};
    if (data.subjectId)
      updateData.subjectId = new Types.ObjectId(data.subjectId);
    if (data.gradeLevelId)
      updateData.gradeLevelId = new Types.ObjectId(data.gradeLevelId);
    if (data.authorId) updateData.authorId = new Types.ObjectId(data.authorId);
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.thumbnailUrl) updateData.thumbnailUrl = data.thumbnailUrl;
    if (data.isPublished !== undefined)
      updateData.isPublished = data.isPublished;
    if (data.isPro !== undefined) updateData.isPro = data.isPro;

    const doc = await this.courseModel.findByIdAndUpdate(
      id,
      updateData as any,
      {
        new: true,
      },
    );
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await this.courseModel.findByIdAndDelete(id);
  }

  async findByAuthorId(authorId: string): Promise<Course[]> {
    const docs = await this.courseModel.find({
      authorId: new Types.ObjectId(authorId),
    });
    return this.mapper.toDomainArray(docs);
  }

  async findBySubjectId(subjectId: string): Promise<Course[]> {
    const docs = await this.courseModel.find({
      subjectId: new Types.ObjectId(subjectId),
    });
    return this.mapper.toDomainArray(docs);
  }

  async findPublished(): Promise<Course[]> {
    const docs = await this.courseModel.find({ isPublished: true });
    return this.mapper.toDomainArray(docs);
  }
}
