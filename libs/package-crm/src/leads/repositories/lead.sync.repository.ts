import { LEAD_SERVICE_OPTIONS } from '@dealer365-backend/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateLeadDto, LeadDto, UpdateLeadDto } from '../dtos';
import { LeadServiceModuleOptions } from '../lead-service-config.interface';
import { ILeadRepository } from './lead.repository.interface';

@Injectable()
export class LeadSyncRepository implements ILeadRepository {
    constructor(@Inject(LEAD_SERVICE_OPTIONS) private readonly options: LeadServiceModuleOptions) {
        Logger.warn(`${this.constructor.name} created with options: ${JSON.stringify(options)}`);
    }
    async find(filter?: any): Promise<LeadDto[]> {
        Logger.warn(`Finding leads...${this.constructor.name}`);
        return [new LeadDto()];
    }
    async findOne(id: string): Promise<LeadDto> {
        Logger.warn(`Finding one lead...${this.constructor.name}`);
        return new LeadDto();
    }
    async updateOne(id: string, dto: UpdateLeadDto): Promise<{ updated: boolean; updatedCount: number; }> {
        Logger.warn(`Updating leads...${this.constructor.name}`);
        return { updated: true, updatedCount: 1 };
    }
    async createOne(dto: CreateLeadDto): Promise<LeadDto> {
        Logger.warn(`Creating leads...${this.constructor.name}`);
        return new LeadDto();
    }
    async deleteOne(id: string): Promise<{ deleted: boolean; deletedCount: number; }> {
        Logger.warn(`Deleting leads...${this.constructor.name}`);
        return { deleted: true, deletedCount: 1 };
    }
}