import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeLevelDocument, GradeLevelSchema } from './infrastructure/persistence/document/schemas/grade-level.schema';
import { GradeLevelRepository } from './infrastructure/persistence/document/repositories/grade-level.repository';
import { GradeLevelRepositoryAbstract } from './infrastructure/persistence/document/repositories/grade-level.repository.abstract';
import { GradeLevelMapper } from './infrastructure/persistence/document/mappers/grade-level.mapper';
import { GradeLevelService } from './grade-level.service';
import { GradeLevelController } from './grade-level.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GradeLevelDocument.name, schema: GradeLevelSchema },
    ]),
  ],
  controllers: [GradeLevelController],
  providers: [
    GradeLevelService,
    {
      provide: GradeLevelRepositoryAbstract,
      useClass: GradeLevelRepository,
    },
    GradeLevelMapper,
  ],
  exports: [GradeLevelService, GradeLevelRepositoryAbstract],
})
export class GradeLevelModule {}
