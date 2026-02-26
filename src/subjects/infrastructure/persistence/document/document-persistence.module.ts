import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectDocument, SubjectSchema } from './schemas/subject.schema';
import { SubjectRepository } from './repositories/subject.repository';
import { SubjectRepositoryAbstract } from './repositories/subject.repository.abstract';
import { SubjectMapper } from './mappers/subject.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubjectDocument.name, schema: SubjectSchema },
    ]),
  ],
  providers: [
    SubjectMapper,
    {
      provide: SubjectRepositoryAbstract,
      useClass: SubjectRepository,
    },
  ],
  exports: [SubjectRepositoryAbstract, SubjectMapper],
})
export class DocumentPersistenceModule {}
