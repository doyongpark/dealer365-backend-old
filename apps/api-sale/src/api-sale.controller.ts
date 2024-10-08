import { Controller, Get } from '@nestjs/common';
import { ApiSaleService } from './api-sale.service';

@Controller()
export class ApiSaleController {
  constructor(private readonly apiSaleService: ApiSaleService) {}

  @Get()
  getHello(): string {
    return this.apiSaleService.getHello();
  }
}
