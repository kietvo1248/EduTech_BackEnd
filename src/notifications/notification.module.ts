import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationDocument,
  NotificationSchema,
} from './infrastructure/persistence/document/schemas/notification.schema';
import { NotificationRepository } from './infrastructure/persistence/document/repositories/notification.repository';
import { NotificationRepositoryAbstract } from './infrastructure/persistence/document/repositories/notification.repository.abstract';
import { NotificationMapper } from './infrastructure/persistence/document/mappers/notification.mapper';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationDocument.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    {
      provide: NotificationRepositoryAbstract,
      useClass: NotificationRepository,
    },
    NotificationMapper,
  ],
  exports: [NotificationService, NotificationRepositoryAbstract],
})
export class NotificationModule {}
