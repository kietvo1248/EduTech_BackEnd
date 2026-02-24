import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubjectDocument,
  SubjectSchema,
} from './infrastructure/persistence/document/schemas/subject.schema';
import { SubjectRepository } from './infrastructure/persistence/document/repositories/subject.repository';
import { SubjectRepositoryAbstract } from './infrastructure/persistence/document/repositories/subject.repository.abstract';
import { SubjectMapper } from './infrastructure/persistence/document/mappers/subject.mapper';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubjectDocument.name, schema: SubjectSchema },
    ]),
  ],
  controllers: [SubjectController],
  providers: [
    SubjectService,
    {
      provide: SubjectRepositoryAbstract,
      useClass: SubjectRepository,
    },
    SubjectMapper,
  ],
  exports: [SubjectService, SubjectRepositoryAbstract],
})
export class SubjectModule {}
