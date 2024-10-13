import { ConfigModule } from '@dealer365-backend/config';
import { CrmServiceModule } from '@dealer365-backend/crm-service';
import { NestModule } from '@dealer365-backend/nest';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApiCrmController } from './api-crm.controller';
import { ApiCrmService } from './api-crm.service';

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule.forRoot({ global: true }),
    NestModule,
    CrmServiceModule],
  controllers: [ApiCrmController],
  providers: [ApiCrmService, ],
})
export class ApiCrmModule { }
