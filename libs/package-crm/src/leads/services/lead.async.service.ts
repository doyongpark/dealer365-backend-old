import { IRepository } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { Lead, LEAD_REPOSITORY, MESSAGE_ID, RequestContextService } from '@dealer365-backend/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ILeadService } from './lead.service.interface';

@Injectable()
export class LeadAsyncService implements ILeadService {
    constructor(
        @Inject(LEAD_REPOSITORY) private readonly leadRepository: IRepository<Lead>,
        private readonly leadBrokerService: IBrokerService,
    ) { }

    async create(data: Partial<Lead>): Promise<Lead> {
        const objectId = await this.leadRepository.newId();

        if (!data.creatorUserId) {
            const userInfo = RequestContextService.getUserInfo();
            data.creatorUserId = userInfo?.userId;
            data.creatorUserName = userInfo?.userName;
        }

        const request = RequestContextService.getRequestIds();

        const msg = {
            correlationId: request?.correlationId,
            messageId: MESSAGE_ID.LEAD_CREATE,
            body: {
                _id: objectId,
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

        if (!data.updaterUserId) {
            const userInfo = RequestContextService.getUserInfo();
            data.updaterUserId = userInfo?.userId;
            data.updaterUserName = userInfo?.userName;
        }

        const request = RequestContextService.getRequestIds();

        this.leadBrokerService.sendMessage({
            correlationId: request?.correlationId,
            messageId: MESSAGE_ID.LEAD_UPDATE,
            body: {
                _id: id,
                data: data,
            },
        });

        return { _id: id } as Lead;
    }

    async delete(id: string): Promise<void> {

        const request = RequestContextService.getRequestIds();

        this.leadBrokerService.sendMessage({
            correlationId: request?.correlationId,
            messageId: MESSAGE_ID.LEAD_DELETE,
            body: {
                _id: id,
                // data: data,
            },
        });
    }
}