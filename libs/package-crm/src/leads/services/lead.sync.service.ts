import { IRepository } from '@dealer365-backend/database';
import { Injectable } from '@nestjs/common';
import { CreateLeadDto, LeadDto, UpdateLeadDto } from '../dtos';
import { ILeadService } from './lead.service.interface';

@Injectable()
export class LeadSyncService implements ILeadService {
    constructor(private readonly leadRepository: IRepository<LeadDto>,
        // private readonly leadQueueService: IQueueService,
    ) { }

    async create(dto: CreateLeadDto): Promise<LeadDto> {
        const result = await this.leadRepository.create(dto);

        // this.leadQueueService.addJob({
        //     correlationId: 'new-correlation-id',
        //     messageId: result.id,
        //     subject: 'create',
        //     body: result,
        // });
        return result;
    }
    
    async search(filter?: any): Promise<LeadDto[]> {
        return await this.leadRepository.findAll();
    }

    async get(id: string): Promise<LeadDto> {
        const result = await this.leadRepository.findOne(id);
        return result;
    }

    async update(id: string, dto: UpdateLeadDto): Promise<LeadDto> {
        const result = await this.leadRepository.update(id, dto);
        // this.leadQueueService.addJob({
        //     correlationId: 'new-correlation-id',
        //     messageId: result.id,
        //     subject: 'update',
        //     body: data,
        // });
        return result;
    }

    async delete(id: string): Promise<void> {
        const result = await this.leadRepository.delete(id);
        // this.leadQueueService.addJob({
        //     correlationId: 'new-correlation-id',
        //     messageId: id,
        //     subject: 'delete',
        //     body: null,
        // });
    }
}