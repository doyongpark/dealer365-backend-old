import { plainToInstance } from 'class-transformer';
import { Document, FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { IRepository } from '../repository.interface';

export class MongoRepository<T> implements IRepository<T> {

  constructor(private readonly model: Model<Document>, private readonly entity: new () => T) { }

  async newId(): Promise<string> {
    return Promise.resolve(new Types.ObjectId().toString());
  }

  async toObjectId(id: string): Promise<Types.ObjectId> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid ID format: ${id}`);
    }
    return Promise.resolve(new Types.ObjectId(id));
  }

  async count(query: FilterQuery<T>, limit?: number): Promise<number> {
    return await this.model.countDocuments(query, { limit });
  }

  async find(query: FilterQuery<T>, options: { limit?: number; sort?: any; skip?: number; } = {}): Promise<T[]> {
    const documents = await this.model.find(query, '', { sort: options.sort || null, })
      .skip(options.skip as number)
      .limit(options.limit as number)
      .exec();

    return documents.map((doc) => plainToInstance(this.entity, doc.toObject()));
  }

  async findById(id: string): Promise<T> {
    const objectId = await this.toObjectId(id);
    const document = await this.model.findById(objectId).exec();
    return document ? plainToInstance(this.entity, document.toObject()) : null;
  }

  async createOne(entity: FilterQuery<T>, options: any = {}): Promise<T> {
    const document = new this.model(entity);
    const saveOptions = options?.writeConcern ? { w: options?.writeConcern } : {};
    const savedDocument = await document.save(saveOptions);
    return plainToInstance(this.entity, savedDocument.toObject());
  }

  async createMany(entities: FilterQuery<T>[], ordered?: boolean): Promise<T[]> {
    const documents = entities.map(entity => new this.model(entity));
    const savedDocuments = await this.model.insertMany(documents, { ordered });
    return savedDocuments.map(doc => plainToInstance(this.entity, doc.toObject()));
  }

  async updateOne(query: FilterQuery<T>, updateQuery: UpdateQuery<T>, option: any = {}): Promise<{ matchedCount: number; modifiedCount: number; }> {
    const result = await this.model.updateOne(query, updateQuery, option);
    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    };
  }

  async updateMany(query: FilterQuery<T>, updateQuery: UpdateQuery<T>): Promise<{ matchedCount: number; modifiedCount: number; }> {
    const result = await this.model.updateMany(query, updateQuery, { multi: true });
    return {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    };
  }

  async deleteById(id: string): Promise<{ acknowledged: boolean; deletedCount: number; }> {
    const objectId = await this.toObjectId(id);
    const result = await this.model.findByIdAndDelete(objectId).exec();
    return {
      acknowledged: result !== null,
      deletedCount: result ? 1 : 0,
    };
  }

  async deleteMany(query: FilterQuery<T>): Promise<{ acknowledged: boolean; deletedCount: number; }> {
    const result = await this.model.deleteMany(query);
    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount
    };
  }

  async aggregate(pipeline: any[]): Promise<T[]> {
    const documents = await this.model.aggregate(pipeline).exec();
    return documents.map(doc => plainToInstance(this.entity, doc));
  }

  async queryBuilder(builder: (qb: any) => any): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}