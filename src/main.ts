// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI 설정
  
  // OpenAPI JSON 제공
  app.getHttpAdapter().get('/doc', (req, res) => {
    res.json(document); // OpenAPI JSON 응답
  });

  await app.listen(3000);

  console.log('API server is running on http://localhost:3000');
}
bootstrap();
