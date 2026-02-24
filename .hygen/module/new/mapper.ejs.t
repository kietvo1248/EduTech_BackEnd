---
to: src/<%= plural %>/infrastructure/persistence/document/mappers/<%= name %>.mapper.ts
---
import { Injectable } from '@nestjs/common';
import { <%= h.changeCase.pascal(name) %> } from '../../../../domain/<%= name %>';
import { <%= h.changeCase.pascal(name) %>DocumentType } from '../schemas/<%= name %>.schema';

@Injectable()
export class <%= h.changeCase.pascal(name) %>Mapper {
  toDomain(doc: <%= h.changeCase.pascal(name) %>DocumentType): <%= h.changeCase.pascal(name) %> {
    return {
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description ?? undefined,
      <%_ if (withEnum) { _%>
      status: doc.status,
      <%_ } _%>
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: <%= h.changeCase.pascal(name) %>DocumentType[]): <%= h.changeCase.pascal(name) %>[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
