import { CreateLeadDto, LeadDto, UpdateLeadDto } from '@dealer365-backend/package-crm';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiLeadService } from './api-lead.service';

@ApiTags('Lead')
@Controller('lead')
export class ApiLeadController {
  constructor(private readonly apiLeadService: ApiLeadService) { }

  @Post()
  async addCrmDoc(@Body() dto: CreateLeadDto): Promise<CreateLeadDto> {
    return await this.apiLeadService.createLead(dto);
  }

  @Get()
  async getCrmDocs(@Query() query: any): Promise<LeadDto[]> {
    return await this.apiLeadService.searchLeads(query);
  }

  @Get(':id ')
  async getCrmDoc(@Param('id') id: string): Promise<LeadDto> {
    return await this.apiLeadService.getLead(id);
  }

  @Put(':id')
  async updateCrmDoc(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return await this.apiLeadService.updateLead(id, dto);
  }

  @Delete(':id')
  async DeleteCrmDoc(@Param('id') id: string) {
    return await this.apiLeadService.deleteLead(id);
  }
}
