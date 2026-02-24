import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourseDocument,
  CourseSchema,
} from './infrastructure/persistence/document/schemas/course.schema';
import { CourseRepository } from './infrastructure/persistence/document/repositories/course.repository';
import { CourseRepositoryAbstract } from './infrastructure/persistence/document/repositories/course.repository.abstract';
import { CourseMapper } from './infrastructure/persistence/document/mappers/course.mapper';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseDocument.name, schema: CourseSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [
    CourseService,
    {
      provide: CourseRepositoryAbstract,
      useClass: CourseRepository,
    },
    CourseMapper,
  ],
  exports: [CourseService, CourseRepositoryAbstract],
})
export class CourseModule {}
