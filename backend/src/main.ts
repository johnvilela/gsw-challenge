import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('GSW Challenge')
    .addBearerAuth({
      description: 'JWT Token',
      type: 'apiKey',
      name: 'authorization',
      in: 'header',
    })
    .setVersion(process.env.npm_package_version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
