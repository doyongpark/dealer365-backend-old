import { Lead } from '@dealer365-backend/shared';
import { Injectable, Logger } from '@nestjs/common';
import { Connection, FilterQuery, Model } from 'mongoose';

@Injectable()
export class TransactionalCrmRepository {

    constructor(private readonly leadModel: Model<Lead>,
        private readonly lead2Model: Model<Lead>,
        private readonly connection: Connection) {
    }

    async createLeads(entity1: FilterQuery<Lead>, entity2: FilterQuery<Lead>): Promise<void> {
        Logger.debug(`[TransactionalCrmRepository] createLeads: ${JSON.stringify(entity1)}, ${JSON.stringify(entity2)}`, this.constructor.name);

        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            // 트랜잭션 세션을 각 쿼리 메서드에 전달
            const result1 = await this.leadModel.create([entity1], { session });
            const result2 = await this.lead2Model.create([entity2], { session });

            await session.abortTransaction();

            // await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
}