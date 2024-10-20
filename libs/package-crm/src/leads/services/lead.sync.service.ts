import { IRepository } from '@dealer365-backend/database';
import { Lead, LEAD_REPOSITORY } from '@dealer365-backend/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ILeadService } from './lead.service.interface';

@Injectable()
export class LeadSyncService implements ILeadService {
    constructor(@Inject(LEAD_REPOSITORY) private readonly leadRepository: IRepository<Lead>,
    ) { }

    async create(data: Partial<Lead>): Promise<Lead> {
        const result = await this.leadRepository.createOne(data);
        return result;
    }

    async search(filter?: any): Promise<Lead[]> {
        return await this.leadRepository.find({});
    }

    async get(id: string): Promise<Lead> {
        const result = await this.leadRepository.findById(id);
        return result;
    }

    async update(id: string, data: Partial<Lead>): Promise<Lead> {
        const result = await this.leadRepository.updateOne({ _id: id }, data, {});

        return { _id: id } as Lead;
    }

    async delete(id: string): Promise<void> {
        const result = await this.leadRepository.deleteById(id);
    }
}