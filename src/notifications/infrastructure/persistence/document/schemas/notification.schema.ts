import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'notifications' })
export class NotificationDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'users' })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  message!: string;

  @Prop({ default: false })
  isRead!: boolean;

  @Prop({ required: true })
  type!: string;
}

export type NotificationDocumentType = HydratedDocument<NotificationDocument> & {
  createdAt: Date;
};

export const NotificationSchema = SchemaFactory.createForClass(NotificationDocument);
