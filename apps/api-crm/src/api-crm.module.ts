import { ConfigModule } from '@dealer365-backend/config';
import { CrmServiceModule } from '@dealer365-backend/crm-service';
import { InterceptorModule, MiddlewareModule } from '@dealer365-backend/nest-common';
import { CustomLoggerModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ApiCrmController } from './api-crm.controller';
import { ApiCrmService } from './api-crm.service';

@Module({
  imports: [
    ConfigModule,
    CrmServiceModule,
    CustomLoggerModule.forRoot(),
    InterceptorModule.forRoot(),
    MiddlewareModule.forRoot(),
  ],
  controllers: [ApiCrmController],
  providers: [ApiCrmService,],
})
export class ApiCrmModule { }