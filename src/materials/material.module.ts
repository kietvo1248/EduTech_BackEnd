import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MaterialDocument,
  MaterialSchema,
} from './infrastructure/persistence/document/schemas/material.schema';
import { MaterialRepository } from './infrastructure/persistence/document/repositories/material.repository';
import { MaterialRepositoryAbstract } from './infrastructure/persistence/document/repositories/material.repository.abstract';
import { MaterialMapper } from './infrastructure/persistence/document/mappers/material.mapper';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MaterialDocument.name, schema: MaterialSchema },
    ]),
  ],
  controllers: [MaterialController],
  providers: [
    MaterialService,
    {
      provide: MaterialRepositoryAbstract,
      useClass: MaterialRepository,
    },
    MaterialMapper,
  ],
  exports: [MaterialService, MaterialRepositoryAbstract],
})
export class MaterialModule {}
