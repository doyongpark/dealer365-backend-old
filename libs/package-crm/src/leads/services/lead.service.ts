import { Injectable, Logger } from '@nestjs/common';
import { CreateLeadDto, LeadDto, UpdateLeadDto } from '../dtos';
import { ILeadRepository } from '../repositories';
import { ILeadService } from './lead.service.interface';

@Injectable()
export class LeadService implements ILeadService {
    constructor(private readonly leadRepository: ILeadRepository) { }

    async get(id: string): Promise<LeadDto> {
        Logger.warn(`Getting lead...${this.constructor.name}`);
        return await this.leadRepository.findOne(id);
    }
    async update(id: string, dto: UpdateLeadDto): Promise<{ updated: boolean; updatedCount: number; }> {
        Logger.warn(`Updating lead...${this.constructor.name}`);
        return await this.leadRepository.updateOne(id, dto);
    }
    async create(dto: CreateLeadDto): Promise<LeadDto> {
        Logger.warn(`Creating lead...${this.constructor.name}`);
        return await this.leadRepository.createOne(dto);
    }
    async delete(id: string): Promise<{ deleted: boolean; deletedCount: number; }> {
        Logger.warn(`Deleting lead...${this.constructor.name}`);
        return await this.leadRepository.deleteOne(id);
    }
    async search(filter?: any): Promise<any> {
        Logger.warn(`Searching leads...${this.constructor.name}`);
        return await this.leadRepository.find(filter);
    }
}