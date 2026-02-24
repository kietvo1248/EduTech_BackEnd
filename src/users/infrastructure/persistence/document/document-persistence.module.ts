import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserRepositoryAbstract } from './repositories/user.repository.abstract';
import { UserMapper } from './mappers/user.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [
    UserMapper,
    {
      provide: UserRepositoryAbstract,
      useClass: UserRepository,
    },
  ],
  exports: [UserRepositoryAbstract],
})
export class DocumentUserPersistenceModule {}
