---
to: src/<%= plural %>/infrastructure/persistence/document/schemas/<%= name %>.schema.ts
---
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
<%_ if (withEnum) { _%>
import { <%= h.changeCase.pascal(enumName || name + 'Status') %> } from '../../../../../enums';
<%_ } _%>

@Schema({ timestamps: true, collection: '<%= plural %>' })
export class <%= h.changeCase.pascal(name) %>Document {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ default: null })
  description?: string | null;

  <%_ if (withEnum) { _%>
  @Prop({
    enum: <%= h.changeCase.pascal(enumName || name + 'Status') %>,
    default: <%= h.changeCase.pascal(enumName || name + 'Status') %>.Pending,
  })
  status!: <%= h.changeCase.pascal(enumName || name + 'Status') %>;
  <%_ } _%>
}

export type <%= h.changeCase.pascal(name) %>DocumentType = HydratedDocument<<%= h.changeCase.pascal(name) %>Document> & {
  createdAt: Date;
  updatedAt: Date;
};

export const <%= h.changeCase.pascal(name) %>Schema = SchemaFactory.createForClass(<%= h.changeCase.pascal(name) %>Document);
