import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // <--- Quan trọng: Giúp module này khả dụng toàn app
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export để các module khác dùng được
})
export class PrismaModule {}