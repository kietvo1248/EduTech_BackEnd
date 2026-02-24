import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'student_profiles' })
export class StudentProfileDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'users', unique: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  fullName!: string;

  @Prop({ type: String, default: null })
  gender?: string | null;

  @Prop({ type: Date, default: null })
  dateOfBirth?: Date | null;

  @Prop({ type: String, default: null })
  schoolName?: string | null;

  @Prop({ type: String, default: null })
  gradeLevel?: string | null;

  @Prop({ default: 0 })
  diamondBalance!: number;

  @Prop({ default: 0 })
  xpTotal!: number;

  @Prop({ default: 0 })
  currentStreak!: number;
}

export type StudentProfileDocumentType =
  HydratedDocument<StudentProfileDocument> & {
    createdAt: Date;
    updatedAt: Date;
  };

export const StudentProfileSchema = SchemaFactory.createForClass(
  StudentProfileDocument,
);
