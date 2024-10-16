import { LEAD_SERVICE_OPTIONS } from '@dealer365-backend/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { LeadServiceModuleOptions } from '../lead-service-config.interface';
import { ILeadRepository } from '../repositories';
import { ILeadService } from './lead.service.interface';

@Injectable()
export class LeadService implements ILeadService {
    constructor(
        @Inject(LEAD_SERVICE_OPTIONS) private readonly options: LeadServiceModuleOptions,
        private readonly leadRepository: ILeadRepository,

    ) {
        Logger.warn(`${this.constructor.name} created with options: ${JSON.stringify(options)}`);
    }

    async search(filter?: any): Promise<any> {
        Logger.warn(`Getting leads...${this.constructor.name}`);
        return await this.leadRepository.search(filter);
    }
}