import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'quiz_attempts' })
export class QuizAttemptDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'users' })
  userId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'questions' })
  questionId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'quizzes' })
  quizId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'lessons' })
  lessonId?: Types.ObjectId;

  @Prop({ required: true })
  isCorrect!: boolean;

  @Prop({ required: true })
  userAnswer!: string;

  @Prop({ required: true, default: 0 })
  score!: number;

  @Prop({ required: true, default: 0 })
  totalQuestions!: number;

  @Prop({ required: true, default: 0 })
  correctAnswers!: number;

  @Prop({ type: Array, default: [] })
  answers!: Array<{
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }>;

  @Prop({ required: true })
  timeSpentMs!: number;

  @Prop({ type: Date })
  completedAt?: Date;
}

export type QuizAttemptDocumentType = HydratedDocument<QuizAttemptDocument> & {
  createdAt: Date;
};

export const QuizAttemptSchema =
  SchemaFactory.createForClass(QuizAttemptDocument);
