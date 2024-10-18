import { IRepository } from '@dealer365-backend/database';
import { Inject, Injectable } from '@nestjs/common';
import { CreateLeadDto, LeadDto, UpdateLeadDto } from '../dtos';
import { ILeadService } from './lead.service.interface';

@Injectable()
export class LeadSyncService implements ILeadService {
    constructor(@Inject('LeadRepository') private readonly leadRepository: IRepository<LeadDto>,
    ) { }

    async create(dto: CreateLeadDto): Promise<LeadDto> {
        const result = await this.leadRepository.create(dto);
        return result;
    }

    async search(filter?: any): Promise<LeadDto[]> {
        return await this.leadRepository.find({});
    }

    async get(id: string): Promise<LeadDto> {
        const result = await this.leadRepository.findOne(id);
        return result;
    }

    async update(id: string, dto: UpdateLeadDto): Promise<LeadDto> {
        const result = await this.leadRepository.update({ _id: id }, dto);

        return { _id: id } as LeadDto;
    }

    async delete(id: string): Promise<void> {
        const result = await this.leadRepository.delete(id);
    }
}