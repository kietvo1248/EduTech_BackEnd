import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RoleDocument,
  RoleSchema,
} from './infrastructure/persistence/document/entities/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoleDocument.name, schema: RoleSchema },
    ]),
  ],
  exports: [
    // Export guards and decorators for use in other modules
    'RolesGuard',
    'Roles',
  ],
})
export class RolesModule {}
