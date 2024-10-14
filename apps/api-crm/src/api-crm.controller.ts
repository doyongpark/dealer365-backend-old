import { Controller, Delete, Get, Logger, Post, Put } from '@nestjs/common';
import { ApiCrmService } from './api-crm.service';
import { UserContextService } from '@dealer365-backend/nest-common';
import { UserContext } from '@dealer365-backend/shared';

@Controller()
export class ApiCrmController {
  constructor(private readonly apiCrmService: ApiCrmService) {}

  @Get()
  get(): string {
    const user = UserContextService.get<UserContext>();
    Logger.warn(JSON.stringify(user)); 
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
