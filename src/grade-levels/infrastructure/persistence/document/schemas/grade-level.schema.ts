import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'grade_levels' })
export class GradeLevelDocument {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: true, unique: true })
  value!: number;
}

export type GradeLevelDocumentType = HydratedDocument<GradeLevelDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const GradeLevelSchema =
  SchemaFactory.createForClass(GradeLevelDocument);
