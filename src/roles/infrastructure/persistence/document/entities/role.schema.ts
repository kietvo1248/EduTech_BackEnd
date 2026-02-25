import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../../../../../enums';

@Schema({ timestamps: true, collection: 'roles' })
export class RoleDocument {
  @Prop({ required: true, enum: UserRole, unique: true })
  name!: UserRole;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false, type: [String], default: [] })
  permissions?: string[];
}

export type RoleDocumentType = HydratedDocument<RoleDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const RoleSchema = SchemaFactory.createForClass(RoleDocument);
