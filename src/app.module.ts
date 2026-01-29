import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module'; // Import từ file vừa tạo
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, // <--- Đăng ký tại đây
    AuthModule, UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}