import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuestionDocument,
  QuestionSchema,
} from './infrastructure/persistence/document/schemas/question.schema';
import { QuestionRepository } from './infrastructure/persistence/document/repositories/question.repository';
import { QuestionRepositoryAbstract } from './infrastructure/persistence/document/repositories/question.repository.abstract';
import { QuestionMapper } from './infrastructure/persistence/document/mappers/question.mapper';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionDocument.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    {
      provide: QuestionRepositoryAbstract,
      useClass: QuestionRepository,
    },
    QuestionMapper,
  ],
  exports: [QuestionService, QuestionRepositoryAbstract],
})
export class QuestionModule {}
