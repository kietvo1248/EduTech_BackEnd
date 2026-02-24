import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'lessons' })
export class LessonDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'chapters' })
  chapterId!: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true, default: '' })
  description!: string;

  @Prop({ required: true, default: 0 })
  orderIndex!: number;

  @Prop({ required: true, default: 0 })
  durationSeconds!: number;

  @Prop({ required: true })
  videoUrl!: string;

  @Prop({ required: true, default: '' })
  contentMd!: string;

  @Prop({ default: false })
  isPreview!: boolean;
}

export type LessonDocumentType = HydratedDocument<LessonDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const LessonSchema = SchemaFactory.createForClass(LessonDocument);
