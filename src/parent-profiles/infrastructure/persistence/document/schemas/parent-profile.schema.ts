import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'parent_profiles' })
export class ParentProfileDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'users', unique: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, unique: true })
  phoneNumber!: string;
}

export type ParentProfileDocumentType = HydratedDocument<ParentProfileDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const ParentProfileSchema = SchemaFactory.createForClass(ParentProfileDocument);
