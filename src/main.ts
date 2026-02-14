import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Validation Setup
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 2. CORS (Cho phép Mobile/Web gọi API)
  app.enableCors();

  // 3. Swagger Config
  const config = new DocumentBuilder()
    .setTitle('EduTech API')
    .setDescription('API documentation for Mobile App')
    .setVersion('1.0')
    .addBearerAuth() // Nút nhập token trên Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();