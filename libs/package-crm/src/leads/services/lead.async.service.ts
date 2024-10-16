import { IMongoRepository } from '@dealer365-backend/database/mongo.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateLeadDto, LeadDto, UpdateLeadDto } from '../dtos';
import { LeadEntity } from '../entities';
import { ILeadService } from './lead.service.interface';
import { IQueueService } from '@dealer365-backend/queue-provider';

@Injectable()
export class LeadAsyncService implements ILeadService {
    constructor(
        @Inject(`LeadRepository`) private readonly leadRepository: IMongoRepository<LeadEntity>,
        private readonly leadQueueService: IQueueService,
    ) { }

    async get(id: string): Promise<LeadDto> {
        const result = await this.leadRepository.findOne(id);
        return result;
    }

    async update(id: string, dto: UpdateLeadDto): Promise<LeadEntity> {

        const data = {
            firstName: dto.firstName,
            fullName: dto.fullName,
            comment: dto.comment,
            addresses: dto.addresses,
            contacts: dto.contacts,
            isConvertedToContact: dto.isConvertedToContact,
        };

        const result = await this.leadRepository.update(id, data);

        this.leadQueueService.addJob({
            correlationId: 'new-correlation-id',
            messageId: result.id,
            subject: 'update',
            body: data,
        });

        return result;
    }

    async create(dto: CreateLeadDto): Promise<LeadDto> {
        const data = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            fullName: dto.fullName,
            comment: dto.comment,
            addresses: dto.addresses,
            contacts: dto.contacts,
            isConvertedToContact: false,
        };

        const result = await this.leadRepository.create(data);

        this.leadQueueService.addJob({
            correlationId: 'new-correlation-id',
            messageId: result.id,
            subject: 'create',
            body: data,
        });

        return result;
    }

    async delete(id: string): Promise<void> {
        const result = await this.leadRepository.delete(id);

        this.leadQueueService.addJob({
            correlationId: 'new-correlation-id',
            messageId: id,
            subject: 'delete',
            body: null,
        });
    }

    async search(filter?: any): Promise<LeadDto[]> {
        return await this.leadRepository.findAll();
    }
}