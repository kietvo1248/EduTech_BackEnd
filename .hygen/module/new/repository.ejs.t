---
to: src/<%= plural %>/infrastructure/persistence/document/<%= name %>.repository.ts
---
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { <%= h.changeCase.pascal(name) %> } from '../../../domain/<%= name %>';
import { <%= h.changeCase.pascal(name) %>RepositoryAbstract } from './repositories/<%= name %>.repository.abstract';
import { <%= h.changeCase.pascal(name) %>Document, <%= h.changeCase.pascal(name) %>DocumentType } from './schemas/<%= name %>.schema';
import { <%= h.changeCase.pascal(name) %>Mapper } from './mappers/<%= name %>.mapper';

@Injectable()
export class <%= h.changeCase.pascal(name) %>Repository extends <%= h.changeCase.pascal(name) %>RepositoryAbstract {
  constructor(
    @InjectModel(<%= h.changeCase.pascal(name) %>Document.name)
    private readonly model: Model<<%= h.changeCase.pascal(name) %>DocumentType>,
    private readonly mapper: <%= h.changeCase.pascal(name) %>Mapper,
  ) {
    super();
  }

  async findById(id: string): Promise<<%= h.changeCase.pascal(name) %> | null> {
    const doc = await this.model.findById(id).exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAll(limit: number, offset: number): Promise<[<%= h.changeCase.pascal(name) %>[], number]> {
    const [docs, total] = await Promise.all([
      this.model.find().sort({ createdAt: -1 }).skip(offset).limit(limit).exec(),
      this.model.countDocuments().exec(),
    ]);
    return [this.mapper.toDomainArray(docs), total];
  }

  async create(<%= h.changeCase.camel(name) %>: Partial<<%= h.changeCase.pascal(name) %>>): Promise<<%= h.changeCase.pascal(name) %>> {
    const created = await this.model.create(<%= h.changeCase.camel(name) %>);
    return this.mapper.toDomain(created);
  }

  async update(id: string, <%= h.changeCase.camel(name) %>: Partial<<%= h.changeCase.pascal(name) %>>): Promise<<%= h.changeCase.pascal(name) %>> {
    const doc = await this.model.findByIdAndUpdate(id, <%= h.changeCase.camel(name) %>, { new: true }).exec();
    if (!doc) {
      throw new NotFoundException('<%= h.changeCase.pascal(name) %> not found');
    }
    return this.mapper.toDomain(doc);
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
