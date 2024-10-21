import { MongoRepository } from '@dealer365-backend/database/impl';
import { Lead } from '@dealer365-backend/shared';
import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Document, FilterQuery, Model } from 'mongoose';

@Injectable()
export class OverridedLeadRepository extends MongoRepository<Lead> {
    _leadModel: Model<Document>;
    constructor(private readonly leadModel: Model<Document>) {
        super(leadModel, Lead);
        this._leadModel = leadModel;
    }

    async createOne(entity: FilterQuery<Lead>, options: any = {}): Promise<Lead> {
        Logger.debug(`[OverridedLeadRepository] createOne: ${JSON.stringify(entity)}`, this.constructor.name);
        const document = new this._leadModel(entity);
        const saveOptions = options?.writeConcern ? { w: options?.writeConcern } : {};
        const savedDocument = await document.save(saveOptions);
        return plainToInstance(Lead, savedDocument.toObject());
    }
}