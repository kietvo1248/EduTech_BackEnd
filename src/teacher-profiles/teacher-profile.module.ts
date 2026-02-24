import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TeacherProfileDocument,
  TeacherProfileSchema,
} from './infrastructure/persistence/document/schemas/teacher-profile.schema';
import { TeacherProfileRepository } from './infrastructure/persistence/document/repositories/teacher-profile.repository';
import { TeacherProfileRepositoryAbstract } from './infrastructure/persistence/document/repositories/teacher-profile.repository.abstract';
import { TeacherProfileMapper } from './infrastructure/persistence/document/mappers/teacher-profile.mapper';
import { TeacherProfileService } from './teacher-profile.service';
import { TeacherProfileController } from './teacher-profile.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeacherProfileDocument.name, schema: TeacherProfileSchema },
    ]),
  ],
  controllers: [TeacherProfileController],
  providers: [
    TeacherProfileService,
    {
      provide: TeacherProfileRepositoryAbstract,
      useClass: TeacherProfileRepository,
    },
    TeacherProfileMapper,
  ],
  exports: [TeacherProfileService, TeacherProfileRepositoryAbstract],
})
export class TeacherProfileModule {}
