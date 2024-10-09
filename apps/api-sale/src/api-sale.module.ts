import { DatabaseModule } from '@dealer365-backend/database';
import { NestModule } from '@dealer365-backend/nest';
import { SharedModule } from '@dealer365-backend/shared';
import { Module } from '@nestjs/common';
import { ApiSaleController } from './api-sale.controller';
import { ApiSaleService } from './api-sale.service';

@Module({
  imports: [DatabaseModule, SharedModule, NestModule],
  controllers: [ApiSaleController],
  providers: [ApiSaleService],
})
export class ApiSaleModule {}
