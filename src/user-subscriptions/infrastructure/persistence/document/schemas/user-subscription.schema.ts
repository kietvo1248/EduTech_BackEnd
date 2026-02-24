import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'user_subscriptions' })
export class UserSubscriptionDocument {
  @Prop({ required: true, type: Types.ObjectId, ref: 'users' })
  userId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'subscription_plans' })
  planId!: Types.ObjectId;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;

  @Prop({ required: true, enum: ['ACTIVE', 'EXPIRED', 'CANCELLED'], default: 'ACTIVE' })
  status!: string;
}

export type UserSubscriptionDocumentType = HydratedDocument<UserSubscriptionDocument> & {
  createdAt: Date;
  updatedAt: Date;
};

export const UserSubscriptionSchema = SchemaFactory.createForClass(UserSubscriptionDocument);
