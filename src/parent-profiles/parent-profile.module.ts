import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ParentProfileDocument,
  ParentProfileSchema,
} from './infrastructure/persistence/document/schemas/parent-profile.schema';
import { ParentProfileRepository } from './infrastructure/persistence/document/repositories/parent-profile.repository';
import { ParentProfileRepositoryAbstract } from './infrastructure/persistence/document/repositories/parent-profile.repository.abstract';
import { ParentProfileMapper } from './infrastructure/persistence/document/mappers/parent-profile.mapper';
import { ParentProfileService } from './parent-profile.service';
import { ParentProfileController } from './parent-profile.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParentProfileDocument.name, schema: ParentProfileSchema },
    ]),
  ],
  controllers: [ParentProfileController],
  providers: [
    ParentProfileService,
    {
      provide: ParentProfileRepositoryAbstract,
      useClass: ParentProfileRepository,
    },
    ParentProfileMapper,
  ],
  exports: [ParentProfileService, ParentProfileRepositoryAbstract],
})
export class ParentProfileModule {}
