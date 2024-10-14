import { Model } from 'mongoose';
import { MongoBaseRepository } from './mongo.bsae.repository';

export class MongoCrmRepository extends MongoBaseRepository {
  constructor(model: Model<any>) {
    super(model);
  }
}