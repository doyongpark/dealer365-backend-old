import { CreateModule, CrmServiceModule, ICreateService } from '@dealer365-backend/crm-service';
import { NestModule } from '@dealer365-backend/nest';
import { SharedModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { ConfigModule } from '@dealer365-backend/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApiCrmController } from './api-crm.controller';
import { ApiCrmService } from './api-crm.service';

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule.forRoot({ global: true }),
    SharedModule,
    NestModule,
    CreateModule],
  controllers: [ApiCrmController],
  providers: [ApiCrmService, ],
})
export class ApiCrmModule { }
