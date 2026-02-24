import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'lesson_progress' })
export class LessonProgressDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'users' })
  userId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'lessons' })
  lessonId!: Types.ObjectId;

  @Prop({ default: false })
  isCompleted!: boolean;

  @Prop({ default: 0 })
  lastWatchedSec!: number;
}

export type LessonProgressDocumentType = HydratedDocument<LessonProgressDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const LessonProgressSchema = SchemaFactory.createForClass(LessonProgressDocument);
