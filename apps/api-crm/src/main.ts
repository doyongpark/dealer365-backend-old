import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ApiCrmModule } from './api-crm.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiCrmModule);

  // Custom Logger 적용
  const customLogger = app.get('LOGGER');
  app.useLogger(customLogger);

  app.flushLogs();

  const configService = app.get(ConfigService);

  const port = configService.get('port');

  app.use(helmet());

  app.enableCors();//to-do: cors 옵션 설정 필요

  //version
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

  app.setGlobalPrefix('api');

  // Swagger 설정
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('API CRM Swagger')
    .setDescription('API description')
    .setVersion('1.0')    
    .addServer(`http://localhost:${port}`) // 기본 서버 URL 설정
    .addBearerAuth() // JWT 인증이 필요한 경우
    .build())); // '/doc' 경로에 Swagger UI 설정
  // Swagger JSON 엔드포인트 (Postman에서 import 가능)
  app.getHttpAdapter().get('/docs-json', (req, res) => {
    res.json(document);  // JSON 형태로 Swagger 스펙을 반환
  });

  // app.useGlobalGuards(
  //   // new AuthGuard(config),
  //   // new ResourceGuard(config)
  // );

  // app.useGlobalFilters(
  //   //new HttpExceptionFilter(config)
  // );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 요청 데이터를 DTO로 변환
      whitelist: true, // DTO에 정의된 필드만 허용
    })
  );

  await app.listen(port);

  app.enableShutdownHooks();
}
bootstrap();
