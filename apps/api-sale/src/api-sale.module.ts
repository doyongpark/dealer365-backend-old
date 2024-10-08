import { Module } from '@nestjs/common';
import { ApiSaleController } from './api-sale.controller';
import { ApiSaleService } from './api-sale.service';

@Module({
  imports: [],
  controllers: [ApiSaleController],
  providers: [ApiSaleService],
})
export class ApiSaleModule {}
