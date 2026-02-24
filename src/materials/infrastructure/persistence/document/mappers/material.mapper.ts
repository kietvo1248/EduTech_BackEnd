import { Injectable } from '@nestjs/common';
import { Material } from '../../../../domain/material';
import { MaterialDocumentType } from '../schemas/material.schema';

@Injectable()
export class MaterialMapper {
  toDomain(doc: MaterialDocumentType): Material {
    return {
      id: doc._id.toString(),
      lessonId: doc.lessonId.toString(),
      title: doc.title,
      fileUrl: doc.fileUrl,
      type: doc.type,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  toDomainArray(docs: MaterialDocumentType[]): Material[] {
    return docs.map((doc) => this.toDomain(doc));
  }
}
