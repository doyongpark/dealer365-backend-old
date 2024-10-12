import { CrmServiceModule } from '@dealer365-backend/crm-service';
import { NestModule } from '@dealer365-backend/nest';
import { SharedModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { configuration } from 'config';
import { ApiCrmController } from './api-crm.controller';
import { ApiCrmService } from './api-crm.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./apps/api-crm/src/.${process.env.NODE_ENV}.env`,
      load: [configuration]
    }),
    EventEmitterModule.forRoot({ global: true }),
    CrmServiceModule,
    SharedModule,
    NestModule],
  controllers: [ApiCrmController],
  providers: [ApiCrmService],
})
export class ApiCrmModule { }
