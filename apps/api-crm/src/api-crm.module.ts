import { DatabaseModule } from '@dealer365-backend/database';
import { NestModule } from '@dealer365-backend/nest';
import { SharedModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ApiCrmController } from './api-crm.controller';
import { ApiCrmService } from './api-crm.service';

@Module({
  imports: [DatabaseModule, SharedModule, NestModule],
  controllers: [ApiCrmController],
  providers: [ApiCrmService],
})
export class ApiCrmModule {}
