---
to: src/<%= plural %>/infrastructure/persistence/document/document-persistence.module.ts
---
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { <%= h.changeCase.pascal(name) %>Document, <%= h.changeCase.pascal(name) %>Schema } from './schemas/<%= name %>.schema';
import { <%= h.changeCase.pascal(name) %>Repository } from './<%= name %>.repository';
import { <%= h.changeCase.pascal(name) %>Mapper } from './mappers/<%= name %>.mapper';
import { <%= h.changeCase.pascal(name) %>RepositoryAbstract } from './repositories/<%= name %>.repository.abstract';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: <%= h.changeCase.pascal(name) %>Document.name, schema: <%= h.changeCase.pascal(name) %>Schema },
    ]),
  ],
  providers: [
    <%= h.changeCase.pascal(name) %>Mapper,
    { provide: <%= h.changeCase.pascal(name) %>RepositoryAbstract, useClass: <%= h.changeCase.pascal(name) %>Repository },
  ],
  exports: [<%= h.changeCase.pascal(name) %>RepositoryAbstract],
})
export class Document<%= h.changeCase.pascal(name) %>PersistenceModule {}
