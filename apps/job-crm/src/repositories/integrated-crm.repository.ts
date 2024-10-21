import { IRepository } from '@dealer365-backend/database';
import { Lead, LEAD_REPOSITORY } from '@dealer365-backend/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

@Injectable()
export class IntegratedCrmRepository {

    constructor(@Inject(LEAD_REPOSITORY) private readonly lead1Repository: IRepository<Lead>,
        @Inject('LEAD2_REPOSITORY') private readonly lead2Repository: IRepository<Lead>) {
    }

    async createLeads(entity1: FilterQuery<Lead>, entity2: FilterQuery<Lead>): Promise<void> {
        Logger.debug(`[IntegratedCrmRepository] createLeads: ${JSON.stringify(entity1)}, ${JSON.stringify(entity2)}`, this.constructor.name);

        const result1 = await this.lead1Repository.createOne(entity1);
        const result2 = await this.lead2Repository.createOne(entity2);
    }
}