import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('Production-ready e-commerce API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('products')
    .addTag('categories')
    .addTag('cart')
    .addTag('orders')
    .addTag('payments')
    .addTag('admin')
    .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 2004, () => {
    console.log(`Server running on port ${process.env.PORT ?? 2004}`);
  });
}

void bootstrap();
