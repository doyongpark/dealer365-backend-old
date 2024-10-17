
import { CreateLeadDto, ILeadService, LeadDto, UpdateLeadDto } from '@dealer365-backend/package-crm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiLeadService {
  constructor(private readonly leadService: ILeadService) {

  }
  async searchLeads(filter?: any): Promise<LeadDto[]> {
    return await this.leadService.search(filter);
  }
  async getLead(id: string): Promise<LeadDto> {
    return await this.leadService.get(id);
  }
  async updateLead(id: string, dto: UpdateLeadDto): Promise<LeadDto> {
    return await this.leadService.update(id, dto);
  }
  async createLead(dto: CreateLeadDto): Promise<LeadDto> {
    return await this.leadService.create(dto);
  }
  async deleteLead(id: string): Promise<void> {
    return await this.leadService.delete(id);
  }
}
