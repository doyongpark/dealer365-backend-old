import { IRepository } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { RequestContextService } from '@dealer365-backend/nest-common/middlewares';
import { EVENT_ACTION, EVENT_TYPE } from '@dealer365-backend/shared';
import { Inject, Injectable } from '@nestjs/common';
import { CreateLeadDto, LeadDto, UpdateLeadDto } from '../dtos';
import { ILeadService } from './lead.service.interface';

@Injectable()
export class LeadAsyncService implements ILeadService {
    constructor(
        @Inject('LeadRepository') private readonly leadRepository: IRepository<LeadDto>,
        private readonly leadBrokerService: IBrokerService,
    ) { }

    async create(dto: CreateLeadDto): Promise<LeadDto> {
        const objectId = await this.leadRepository.newId();

        const request = RequestContextService.getRequestIds();

        this.leadBrokerService.sendMessage({
            correlationId: request?.correlationId,
            messageId: request?.requestId,
            body: {
                type: EVENT_TYPE.LEAD,
                action: EVENT_ACTION.CREATE,
                id: objectId,
                data: dto,
            },
        });

        return { _id: objectId } as LeadDto;
    }

    async search(filter?: any): Promise<LeadDto[]> {
        return await this.leadRepository.find({});
    }

    async get(id: string): Promise<LeadDto> {
        const result = await this.leadRepository.findOne({ _id: await this.leadRepository.toObjectId(id) });
        return result;
    }

    async update(id: string, dto: UpdateLeadDto): Promise<LeadDto> {
        const request = RequestContextService.getRequestIds();

        this.leadBrokerService.sendMessage({
            correlationId: request?.correlationId,
            messageId: request?.requestId,
            body: {
                type: EVENT_TYPE.LEAD,
                action: EVENT_ACTION.UPDATE,
                id: id,
                data: dto,
            },
        });

        return { _id: id } as LeadDto;
    }

    async delete(id: string): Promise<void> {

        const request = RequestContextService.getRequestIds();

        this.leadBrokerService.sendMessage({
            correlationId: request?.correlationId,
            messageId: request?.requestId,
            body: {
                type: EVENT_TYPE.LEAD,
                action: EVENT_ACTION.DELETE,
                id: id,
            },
        });
    }
}