import { CreateLeadDto, ILeadService, LeadDto, UpdateLeadDto } from '@dealer365-backend/package-crm';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lead')
@Controller({ path: 'lead', version: '2' }) // 버전 2로 설정
export class ApiLeadControllerV2 {
  constructor(private readonly leadService: ILeadService) { }

  @Post()
  async addCrmDoc(@Body() dto: CreateLeadDto): Promise<CreateLeadDto> {
    return await this.leadService.create(dto);
  }

  @Get()
  async getCrmDocs(@Query() query: any): Promise<LeadDto[]> {
    return await this.leadService.search(query);
  }

  @Get(':id ')
  async getCrmDoc(@Param('id') id: string): Promise<LeadDto> {
    return await this.leadService.get(id);
  }

  @Put(':id')
  async updateCrmDoc(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return await this.leadService.update(id, dto);
  }

  @Delete(':id')
  async DeleteCrmDoc(@Param('id') id: string) {
    return await this.leadService.delete(id);
  }
}
