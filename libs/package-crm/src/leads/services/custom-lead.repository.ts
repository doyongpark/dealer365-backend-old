import { IRepository } from '@dealer365-backend/database';
import { IMongoRepository } from '@dealer365-backend/database/impl';
import { LeadDto } from '@dealer365-backend/shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from '../entities';

@Injectable()
export class CustomLeadRepository extends IMongoRepository<LeadDto> implements IRepository<LeadDto> {

    constructor(@InjectModel('Lead') private leadModel: Model<Lead>,) {
        super(leadModel);
    }

    async find(query: any, options: { limit?: number; sort?: any; skip?: number; } = {}): Promise<LeadDto[]> {

        Logger.warn(`CustomLeadRepository.find: ${JSON.stringify(query)}`);

        const data = await this.leadModel.find(query, '', { sort: options.sort || null, })
            .sort(options.sort || null)
            .skip(options.skip as number)
            .limit(options.limit as number)
            .exec();

        return data.map(doc => this.convertToPlainObject<LeadDto>(doc));
    }
}