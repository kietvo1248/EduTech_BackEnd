import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      // Log query ra console để dễ debug khi dev (tùy chọn)
      log: ['info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    // Kết nối DB khi ứng dụng bật
    await this.$connect();
  }

  async onModuleDestroy() {
    // Ngắt kết nối khi ứng dụng tắt
    await this.$disconnect();
  }
}
