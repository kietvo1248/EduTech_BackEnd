import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'chapters' })
export class ChapterDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'courses' })
  courseId!: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true, default: 0 })
  orderIndex!: number;
}

export type ChapterDocumentType = HydratedDocument<ChapterDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const ChapterSchema = SchemaFactory.createForClass(ChapterDocument);
