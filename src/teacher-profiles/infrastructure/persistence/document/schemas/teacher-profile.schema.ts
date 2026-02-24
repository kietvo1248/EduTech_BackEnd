import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'teacher_profiles' })
export class TeacherProfileDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'users', unique: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  fullName!: string;

  @Prop({ type: String, default: null })
  bio?: string | null;
}

export type TeacherProfileDocumentType = HydratedDocument<TeacherProfileDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const TeacherProfileSchema = SchemaFactory.createForClass(TeacherProfileDocument);
