import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class StorageService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('storage.cloudName'),
      api_key: this.configService.get<string>('storage.apiKey'),
      api_secret: this.configService.get<string>('storage.apiSecret'),
      secure: true,
    });
  }

  getFolder(): string {
    return this.configService.get<string>('storage.folder') ?? 'edutech';
  }

  getClient() {
    return cloudinary;
  }
}
