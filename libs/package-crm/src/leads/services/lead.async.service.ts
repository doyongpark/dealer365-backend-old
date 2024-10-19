import { IRepository, LEAD_REPOSITORY } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { RequestContextService, UserContextService } from '@dealer365-backend/nest-common/middlewares';
import { CreateLeadDto, EVENT_ACTION, EVENT_TYPE, ILeadService, LeadDto, UpdateLeadDto } from '@dealer365-backend/shared';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LeadAsyncService implements ILeadService {
    constructor(
        @Inject(LEAD_REPOSITORY) private readonly leadRepository: IRepository<LeadDto>,
        private readonly leadBrokerService: IBrokerService,
    ) { }

    async create(dto: CreateLeadDto): Promise<LeadDto> {
        const objectId = await this.leadRepository.newId();

        const context = UserContextService.getUserContext();
        const request = RequestContextService.getRequestIds();

        const msg = {
            correlationId: request?.correlationId,
            messageId: request?.requestId,
            body: {
                type: EVENT_TYPE.LEAD,
                action: EVENT_ACTION.CREATE,
                id: objectId,
                data: dto,
            },
        };
        this.leadBrokerService.sendMessage(msg);

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

        const context = UserContextService.getUserContext();
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

        const context = UserContextService.getUserContext();
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