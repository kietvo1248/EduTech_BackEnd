import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy, GoogleStrategy } from './strategies'; // Import từ file index

@Module({
  imports: [
    // 1. Cung cấp JwtService cho AuthService
    JwtModule.register({}),

    // 2. Hỗ trợ Passport
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // 3. Đăng ký các chiến thuật xác thực (Strategies)
    AtStrategy,
    RtStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
