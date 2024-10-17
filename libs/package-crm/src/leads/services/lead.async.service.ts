import { IRepository } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { Injectable } from '@nestjs/common';
import { CreateLeadDto, LeadDto, UpdateLeadDto } from '../dtos';
import { ILeadService } from './lead.service.interface';

@Injectable()
export class LeadAsyncService implements ILeadService {
    constructor(
        private readonly leadRepository: IRepository<LeadDto>,
        private readonly leadBrokerService: IBrokerService,
    ) { }

    async create(dto: CreateLeadDto): Promise<LeadDto> {
        const objectId = this.leadRepository.newId();

        this.leadBrokerService.sendMessage({
            correlationId: 'new-correlation-id',
            messageId: objectId,
            subject: 'create',
            body: dto,
        });

        return { _id: objectId } as LeadDto;
    }

    async search(filter?: any): Promise<LeadDto[]> {
        return await this.leadRepository.findAll();
    }

    async get(id: string): Promise<LeadDto> {
        const result = await this.leadRepository.findOne(id);
        return result;
    }

    async update(id: string, dto: UpdateLeadDto): Promise<LeadDto> {

        this.leadBrokerService.sendMessage({
            correlationId: 'new-correlation-id',
            messageId: id,
            subject: 'update',
            body: dto,
        });
        return { _id: id } as LeadDto;
    }

    async delete(id: string): Promise<void> {

        this.leadBrokerService.sendMessage({
            correlationId: 'new-correlation-id',
            messageId: id,
            subject: 'delete',
            body: id,
        });
    }
}