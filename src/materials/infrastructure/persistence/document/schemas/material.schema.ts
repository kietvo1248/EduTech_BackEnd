import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'materials' })
export class MaterialDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'lessons' })
  lessonId!: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  fileUrl!: string;

  @Prop({ required: true })
  type!: string;
}

export type MaterialDocumentType = HydratedDocument<MaterialDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const MaterialSchema = SchemaFactory.createForClass(MaterialDocument);
