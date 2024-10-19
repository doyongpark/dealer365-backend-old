import { IRepository } from '@dealer365-backend/database';
import { CreateLeadDto, ILeadService, LEAD_REPOSITORY, LeadDto, UpdateLeadDto } from '@dealer365-backend/shared';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LeadSyncService implements ILeadService {
    constructor(@Inject(LEAD_REPOSITORY) private readonly leadRepository: IRepository<LeadDto>,
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