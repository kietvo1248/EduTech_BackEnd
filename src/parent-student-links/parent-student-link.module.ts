import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ParentStudentLinkDocument,
  ParentStudentLinkSchema,
} from './infrastructure/persistence/document/schemas/parent-student-link.schema';
import { ParentStudentLinkRepository } from './infrastructure/persistence/document/repositories/parent-student-link.repository';
import { ParentStudentLinkRepositoryAbstract } from './infrastructure/persistence/document/repositories/parent-student-link.repository.abstract';
import { ParentStudentLinkMapper } from './infrastructure/persistence/document/mappers/parent-student-link.mapper';
import { ParentStudentLinkService } from './parent-student-link.service';
import { ParentStudentLinkController } from './parent-student-link.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParentStudentLinkDocument.name, schema: ParentStudentLinkSchema },
    ]),
  ],
  controllers: [ParentStudentLinkController],
  providers: [
    ParentStudentLinkService,
    {
      provide: ParentStudentLinkRepositoryAbstract,
      useClass: ParentStudentLinkRepository,
    },
    ParentStudentLinkMapper,
  ],
  exports: [ParentStudentLinkService, ParentStudentLinkRepositoryAbstract],
})
export class ParentStudentLinkModule {}
