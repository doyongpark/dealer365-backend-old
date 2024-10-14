import { ConfigModule } from '@dealer365-backend/config';
import { CrmServiceModule } from '@dealer365-backend/crm-service';
import { FilterModule, GuardModule, InterceptorModule, MiddlewareModule } from '@dealer365-backend/nest-common';
import { CustomLoggerModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiCrmController } from './api-crm.controller';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { ApiCrmService } from './api-crm.service';

@Module({
  imports: [
    ConfigModule,
    CrmServiceModule,
    CustomLoggerModule.forRoot(),
    InterceptorModule.forRoot(),
    MiddlewareModule.forRoot(),
    FilterModule.forRoot(),
    GuardModule.forRoot(),
    CqrsModule
  ],
  controllers: [ApiCrmController],
  providers: [ApiCrmService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class ApiCrmModule { }