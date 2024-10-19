import { IRepository } from '@dealer365-backend/database';
import { IMongoRepository } from '@dealer365-backend/database/impl';
import { Lead } from '@dealer365-backend/package-crm/leads/entities';
import { LeadDto } from '@dealer365-backend/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomLeadRepository extends IMongoRepository<LeadDto> implements IRepository<LeadDto> {

    constructor(@InjectModel(Lead.name) private leadModel: Model<Lead>,) {
        super(leadModel);
    }

    async find(query: any, options: { limit?: number; sort?: any; skip?: number; } = {}): Promise<LeadDto[]> {

        Logger.warn(`CustomLeadRepository.find in job-crm: ${JSON.stringify(query)}`);

        const data = await this.leadModel.find(query, '', { sort: options.sort || null, })
            .sort(options.sort || null)
            .skip(options.skip as number)
            .limit(options.limit as number)
            .exec();

        return data.map(doc => this.convertToPlainObject<LeadDto>(doc));
    }
}