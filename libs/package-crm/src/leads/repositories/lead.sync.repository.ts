import { LEAD_SERVICE_OPTIONS } from '@dealer365-backend/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { LeadServiceModuleOptions } from '../lead-service-config.interface';
import { ILeadRepository } from './lead.repository.interface';

@Injectable()
export class LeadSyncRepository implements ILeadRepository {
    constructor(@Inject(LEAD_SERVICE_OPTIONS) private readonly options: LeadServiceModuleOptions) {
        Logger.warn(`${this.constructor.name} created with options: ${JSON.stringify(options)}`);
    }
    async search(filter?: any): Promise<any> {
        Logger.warn(`Searching leads...${this.constructor.name}`);
        return [];
    }
}