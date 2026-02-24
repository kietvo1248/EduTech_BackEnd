import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SessionDocument,
  SessionSchema,
} from './infrastructure/persistence/document/schemas/session.schema';
import { SessionRepository } from './infrastructure/persistence/document/repositories/session.repository';
import { SessionRepositoryAbstract } from './infrastructure/persistence/document/repositories/session.repository.abstract';
import { SessionMapper } from './infrastructure/persistence/document/mappers/session.mapper';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SessionDocument.name, schema: SessionSchema },
    ]),
  ],
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: SessionRepositoryAbstract,
      useClass: SessionRepository,
    },
    SessionMapper,
  ],
  exports: [SessionService, SessionRepositoryAbstract],
})
export class SessionModule {}
