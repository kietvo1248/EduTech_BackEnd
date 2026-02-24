import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'quiz_attempts' })
export class QuizAttemptDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'users' })
  userId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'questions' })
  questionId!: Types.ObjectId;

  @Prop({ required: true })
  isCorrect!: boolean;

  @Prop({ required: true })
  userAnswer!: string;

  @Prop({ required: true })
  timeSpentMs!: number;
}

export type QuizAttemptDocumentType = HydratedDocument<QuizAttemptDocument> & {
  createdAt: Date;
};

export const QuizAttemptSchema =
  SchemaFactory.createForClass(QuizAttemptDocument);
