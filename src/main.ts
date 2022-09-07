import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger
  SwaggerModule.setup(
    '/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('블로그 서비스')
        .setDescription('블로그 서비스 api')
        .setVersion('1.0')
        .build(),
    ),
  );
  await app.listen(3000);
}
bootstrap();
