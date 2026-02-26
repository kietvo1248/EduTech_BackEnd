import { Module } from '@nestjs/common';
import { DocumentPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';

@Module({
  imports: [DocumentPersistenceModule],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
