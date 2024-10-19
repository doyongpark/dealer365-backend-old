import { IRepository, LEAD_REPOSITORY } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { RequestContextService, UserContextService } from '@dealer365-backend/nest-common/middlewares';
import { EVENT_ACTION, EVENT_TYPE, Lead } from '@dealer365-backend/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ILeadService } from '../lead.service.interface';

@Injectable()
export class LeadAsyncService implements ILeadService {
    constructor(
        @Inject(LEAD_REPOSITORY) private readonly leadRepository: IRepository<Lead>,
        private readonly leadBrokerService: IBrokerService,
    ) { }

    async create(data: Partial<Lead>): Promise<Lead> {
        const objectId = await this.leadRepository.newId();

        const userInfo = UserContextService.getUserInfo();
        data.creatorUserId = userInfo?.userId;
        data.creatorUserName = userInfo?.userName;

        const request = RequestContextService.getRequestIds();

        const msg = {
            correlationId: request?.correlationId,
            messageId: request?.requestId,
            body: {
                type: EVENT_TYPE.LEAD,
                action: EVENT_ACTION.CREATE,
                id: objectId,
                data: data,
            },
        };
        this.leadBrokerService.sendMessage(msg);

        return { _id: objectId } as Lead;
    }

    async search(filter?: any): Promise<Lead[]> {
        return await this.leadRepository.find({});
    }

    async get(id: string): Promise<Lead> {
        return await this.leadRepository.findById(id);
    }

    async update(id: string, data: Partial<Lead>): Promise<Lead> {

        const userInfo = UserContextService.getUserInfo();
        data.updaterUserId = userInfo?.userId;
        data.updaterUserName = userInfo?.userName;

        const request = RequestContextService.getRequestIds();

        this.leadBrokerService.sendMessage({
            correlationId: request?.correlationId,
            messageId: request?.requestId,
            body: {
                type: EVENT_TYPE.LEAD,
                action: EVENT_ACTION.UPDATE,
                id: id,
                data: data,
            },
        });

        return { _id: id } as Lead;
    }

    async delete(id: string): Promise<void> {

        const userInfo = UserContextService.getUserInfo();
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