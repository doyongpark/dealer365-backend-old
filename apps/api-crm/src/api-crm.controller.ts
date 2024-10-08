import { Controller, Get } from '@nestjs/common';
import { ApiCrmService } from './api-crm.service';

@Controller()
export class ApiCrmController {
  constructor(private readonly apiCrmService: ApiCrmService) {}

  @Get()
  getHello(): string {
    return this.apiCrmService.getHello();
  }
}
