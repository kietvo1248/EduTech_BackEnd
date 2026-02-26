import { Module } from '@nestjs/common';
import { DocumentPersistenceModule } from './infrastructure/persistence/document';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

@Module({
  imports: [DocumentPersistenceModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService, DocumentPersistenceModule],
})
export class CourseModule {}
