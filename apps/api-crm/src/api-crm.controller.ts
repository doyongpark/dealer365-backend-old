import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiCrmService } from './api-crm.service';

@Controller()
export class ApiCrmController {
  constructor(private readonly apiCrmService: ApiCrmService) {}

  @Get()
  get(): string {
    return this.apiCrmService.get();
  }

  @Post()
  post(): string {
    return this.apiCrmService.post();
  }

  @Put()
  put(): string {
    return this.apiCrmService.put();
  }

  @Delete()
  delete(): string {
    return this.apiCrmService.delete();
  }
}
