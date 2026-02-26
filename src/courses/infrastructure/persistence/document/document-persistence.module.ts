import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseDocument, CourseSchema } from './schemas';
import { CourseRepository, CourseRepositoryAbstract } from './repositories';
import { CourseMapper } from './mappers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseDocument.name, schema: CourseSchema },
    ]),
  ],
  providers: [
    {
      provide: CourseRepositoryAbstract,
      useClass: CourseRepository,
    },
    CourseMapper,
  ],
  exports: [CourseRepositoryAbstract, CourseMapper],
})
export class DocumentPersistenceModule {}
