import { Document, Model, Types } from 'mongoose';
import { IRepository } from '../repository.interface';

export class IMongoRepository<T> extends IRepository<T> {

  constructor(private readonly model: Model<Document>) {
    super();
  }

  async newId(): Promise<string> {
    return Promise.resolve(new Types.ObjectId().toString());
  }

  async toObjectId(id: string): Promise<Types.ObjectId> {
    return new Types.ObjectId(id);
  }

  async count(query: any, limit?: number): Promise<number> {
    return this.model.countDocuments(query, { limit });
  }

  async find(query: any, options: { limit?: number; sort?: any; skip?: number; } = {}): Promise<T[]> {
    const data = await this.model.find(query, '', { sort: options.sort || null, })
      .sort(options.sort || null)
      .skip(options.skip as number)
      .limit(options.limit as number)
      .exec();

    return data.map(doc => this.convertToPlainObject<T>(doc));
  }

  async findOne(query: any): Promise<T> {
    const data = await this.model.findOne(query).exec();
    return this.convertToPlainObject<T>(data);
  }

  async create(data: any, options: any = {}): Promise<T> {
    const document = this.convertToDocument(this.model, data);
    const saveOptions = options?.writeConcern ? { w: options?.writeConcern } : {};

    const saved = await document.save(saveOptions);

    return this.convertToPlainObject<T>(saved);
  }

  async createMany(data: any[], ordered?: boolean): Promise<{ acknowledged: boolean; insertedCount: number; insertedIds: string[]; }> {
    let result: any[];
    try {
      result = await this.model.insertMany(data, { ordered });
    } catch (e) {
      throw new Error(e.message);
    }

    const insertedIds = result.map((inserted) => inserted._id);

    return {
      acknowledged: true,
      insertedCount: result.length,
      insertedIds,
    };
  }

  async update(query: any, updateQuery: any): Promise<{ matched: number; modified: number; }> {
    const saved = await this.model.updateMany(query, updateQuery, {
      multi: true,
    });

    return {
      matched: saved.matchedCount,
      modified: saved.modifiedCount,
    };
  }

  async updateOne(query: any, updateQuery: any, option?: any): Promise<{ matched: number; modified: number; }> {
    const saved = await this.model.updateOne(query, updateQuery, option);

    return {
      matched: saved.matchedCount,
      modified: saved.modifiedCount,
    };
  }

  async delete(query: any): Promise<{ acknowledged: boolean; deletedCount: number; }> {
    return await this.model.deleteMany(query);
  }

  async aggregate(query: any[], options: any = {}): Promise<any> {
    return await this.model.aggregate(query).read(options.readPreference || 'primary');
  }

  async aggregateWithMap(query: any[], options: any = {}): Promise<T[]> {
    const documents = await this.model.aggregate(query).read(options.readPreference || 'primary');
    return documents.map(doc => this.convertToPlainObject<T>(doc));
  }

  convertToDocument<T>(model: Model<Document>, plainObject: T): Document {
    return new model(plainObject);
  }

  convertToPlainObject<T>(document: Document): T {
    const plainObject = document.toObject();
    delete plainObject.__v;
    return plainObject as T;
  }
}