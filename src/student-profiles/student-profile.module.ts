import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StudentProfileDocument,
  StudentProfileSchema,
} from './infrastructure/persistence/document/schemas/student-profile.schema';
import { StudentProfileRepository } from './infrastructure/persistence/document/repositories/student-profile.repository';
import { StudentProfileRepositoryAbstract } from './infrastructure/persistence/document/repositories/student-profile.repository.abstract';
import { StudentProfileMapper } from './infrastructure/persistence/document/mappers/student-profile.mapper';
import { StudentProfileService } from './student-profile.service';
import { StudentProfileController } from './student-profile.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentProfileDocument.name, schema: StudentProfileSchema },
    ]),
  ],
  controllers: [StudentProfileController],
  providers: [
    StudentProfileService,
    {
      provide: StudentProfileRepositoryAbstract,
      useClass: StudentProfileRepository,
    },
    StudentProfileMapper,
  ],
  exports: [StudentProfileService, StudentProfileRepositoryAbstract],
})
export class StudentProfileModule {}
