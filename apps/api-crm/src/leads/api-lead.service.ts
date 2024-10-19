

import { ILeadService } from '@dealer365-backend/package-crm/leads';
import { Lead } from '@dealer365-backend/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiLeadService {
  constructor(private readonly leadService: ILeadService) {

  }
  async searchLeads(filter?: any): Promise<Lead[]> {
    return await this.leadService.search(filter);
  }
  async getLead(id: string): Promise<Lead> {
    return await this.leadService.get(id);
  }
  async updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
    return await this.leadService.update(id, data);
  }
  async createLead(data: Partial<Lead>): Promise<Lead> {
    return await this.leadService.create(data);
  }
  async deleteLead(id: string): Promise<void> {
    return await this.leadService.delete(id);
  }
}
