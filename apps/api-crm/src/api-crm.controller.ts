import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCrmService } from './api-crm.service';

@ApiTags('CRM')
@Controller('crm')
export class ApiCrmController {
  constructor(private readonly crmService: ApiCrmService) { }

  @Post()
  async addCrmDoc(@Body() dto: any) {
    return this.crmService.post();
  }

  @Get()
  getCrmDocs() {
    return this.crmService.get();
  }

  @Put(':id')
  updateCrmDoc(@Param('id') id: string, @Body() dto: any) {
    return this.crmService.put();
  }

  @Delete(':id')
  DeleteCrmDoc(@Param('id') id: string) {
    return this.crmService.delete();
  }
}
