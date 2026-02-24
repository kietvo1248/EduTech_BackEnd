import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'subjects' })
export class SubjectDocument {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: true, unique: true })
  slug!: string;

  @Prop({ required: true })
  iconUrl!: string;
}

export type SubjectDocumentType = HydratedDocument<SubjectDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const SubjectSchema = SchemaFactory.createForClass(SubjectDocument);
