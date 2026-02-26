import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery } from 'mongoose';
import { CourseDocument, CourseDocumentType } from '../schemas/course.schema';
import { CourseRepositoryAbstract } from './course.repository.abstract';
import { CourseMapper } from '../mappers/course.mapper';
import { Course } from '../../../../domain/course';
import { GradeLevel, CourseStatus } from '../../../../../enums';

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

  async findByIdNotDeleted(id: string): Promise<Course | null> {
    const doc = await this.courseModel.findOne({ 
      _id: id,
      isDeleted: { $ne: true }
    });
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAll(): Promise<Course[]> {
    const docs = await this.courseModel.find();
    return this.mapper.toDomainArray(docs);
  }

  async findAllNotDeleted(): Promise<Course[]> {
    const docs = await this.courseModel.find({ isDeleted: { $ne: true } });
    return this.mapper.toDomainArray(docs);
  }

  async create(
    data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Course> {
    const createData: any = {
      subjectId: new Types.ObjectId(data.subjectId),
      gradeLevelId: new Types.ObjectId(data.gradeLevelId),
      gradeLevel: data.gradeLevel,
      authorId: new Types.ObjectId(data.authorId),
      title: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
    };

    // Handle status and type fields
    createData.status = data.status || CourseStatus.Draft;
    createData.type = data.type || 'Free';
    createData.isDeleted = data.isDeleted ?? false;
    createData.deletedAt = data.deletedAt || null;

    const doc = await this.courseModel.create(createData);
    return this.mapper.toDomain(doc);
  }

  async update(id: string, data: Partial<Course>): Promise<Course | null> {
    const updateData: Record<string, unknown> = {};
    
    if (data.subjectId)
      updateData.subjectId = new Types.ObjectId(data.subjectId);
    if (data.gradeLevelId)
      updateData.gradeLevelId = new Types.ObjectId(data.gradeLevelId);
    if (data.gradeLevel) updateData.gradeLevel = data.gradeLevel;
    if (data.authorId) updateData.authorId = new Types.ObjectId(data.authorId);
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.thumbnailUrl) updateData.thumbnailUrl = data.thumbnailUrl;

    // Handle new fields
    if (data.status) updateData.status = data.status;
    if (data.type) updateData.type = data.type;
    if (data.isDeleted !== undefined) updateData.isDeleted = data.isDeleted;
    if (data.deletedAt !== undefined) updateData.deletedAt = data.deletedAt;

    const doc = await this.courseModel.findByIdAndUpdate(
      id,
      updateData as UpdateQuery<CourseDocumentType>,
      { new: true },
    );
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await this.courseModel.findByIdAndDelete(id);
  }

  // Filter and search methods
  async findByFilter(filter: any, sort?: any): Promise<Course[]> {
    let query = this.courseModel.find(filter);
    if (sort) {
      query = query.sort(sort);
    }
    const docs = await query.exec();
    return this.mapper.toDomainArray(docs);
  }

  async findByFilterWithPagination(
    filter: any,
    sort: any,
    skip: number,
    limit: number,
  ): Promise<Course[]> {
    const docs = await this.courseModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
    return this.mapper.toDomainArray(docs);
  }

  async countByFilter(filter: any): Promise<number> {
    return this.courseModel.countDocuments(filter);
  }

  // Author-related methods
  async findByAuthorId(authorId: string): Promise<Course[]> {
    const docs = await this.courseModel.find({
      authorId: new Types.ObjectId(authorId),
    });
    return this.mapper.toDomainArray(docs);
  }

  async findByAuthorIdNotDeleted(authorId: string): Promise<Course[]> {
    const docs = await this.courseModel.find({
      authorId: new Types.ObjectId(authorId),
      isDeleted: { $ne: true },
    });
    return this.mapper.toDomainArray(docs);
  }

  // Subject-related methods
  async findBySubjectId(subjectId: string): Promise<Course[]> {
    const docs = await this.courseModel.find({
      subjectId: new Types.ObjectId(subjectId),
    });
    return this.mapper.toDomainArray(docs);
  }

  async findBySubjectIdNotDeleted(subjectId: string): Promise<Course[]> {
    const docs = await this.courseModel.find({
      subjectId: new Types.ObjectId(subjectId),
      isDeleted: { $ne: true },
    });
    return this.mapper.toDomainArray(docs);
  }

  // Status-related methods  
  async findPublished(): Promise<Course[]> {
    const docs = await this.courseModel.find({ 
      status: CourseStatus.Published,
      isDeleted: { $ne: true }
    });
    return this.mapper.toDomainArray(docs);
  }

  async findByStatusNotDeleted(status: CourseStatus): Promise<Course[]> {
    const docs = await this.courseModel.find({
      status,
      isDeleted: { $ne: true },
    });
    return this.mapper.toDomainArray(docs);
  }

  // Grade level methods
  async findByGradeLevel(gradeLevel: GradeLevel): Promise<Course[]> {
    const docs = await this.courseModel.find({
      gradeLevel,
    });
    return this.mapper.toDomainArray(docs);
  }

  async findByGradeLevelNotDeleted(gradeLevel: GradeLevel): Promise<Course[]> {
    const docs = await this.courseModel.find({
      gradeLevel,
      isDeleted: { $ne: true },
      status: CourseStatus.Published, // Only return published courses for students
    });
    return this.mapper.toDomainArray(docs);
  }

  async getChaptersWithLessons(courseId: string): Promise<any[]> {
    // TODO: Implement actual logic to populate chapters and lessons
    // For now, return empty array to prevent compilation error
    return [];
  }
}
