import { LOGGER } from '@dealer365-backend/shared';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { ApiCrmModule } from './api-crm.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiCrmModule);

  app.useLogger(app.get(LOGGER));
  app.flushLogs();

  const configService = app.get(ConfigService);
  const port = configService.get<number>(process.env.PORT) || 3000;

  app.use(helmet());// Helmet 미들웨어를 사용하여 보안 헤더 설정

  app.use(compression({
    level: 6, // 압축 수준 (0-9)
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        // 특정 헤더가 있는 경우 압축하지 않음
        return false;
      }
      // 기본적으로 모든 요청을 압축
      return compression.filter(req, res);
    }
  }));

  app.enableCors();  

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
  
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 요청 데이터를 DTO로 변환
      whitelist: true, // DTO에 정의된 필드만 허용
    })
  );

  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('API CRM Swagger')
    .setDescription('API description')
    .setVersion('1.0')    
    .addServer(`http://localhost:${port}`) // 기본 서버 URL 설정
    .addBearerAuth() // JWT 인증이 필요한 경우
    .build()));

  app.getHttpAdapter().get('/docs-json', (req, res) => {
    res.json(document);  // JSON 형태로 Swagger 스펙을 반환
  });

  await app.listen(port);

  app.enableShutdownHooks();
}
bootstrap();
