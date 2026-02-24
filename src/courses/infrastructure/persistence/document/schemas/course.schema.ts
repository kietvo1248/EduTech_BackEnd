import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'courses' })
export class CourseDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'subjects' })
  subjectId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'grade_levels' })
  gradeLevelId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'users' })
  authorId!: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  thumbnailUrl!: string;

  @Prop({ default: false })
  isPublished!: boolean;

  @Prop({ default: false })
  isPro!: boolean;
}

export type CourseDocumentType = HydratedDocument<CourseDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const CourseSchema = SchemaFactory.createForClass(CourseDocument);
