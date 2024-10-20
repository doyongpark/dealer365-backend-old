import { plainToInstance } from 'class-transformer';
import { ObjectId, Repository } from 'typeorm';
import { IRepository } from './repository.interface';

export class TypeOrmRepository<T> implements IRepository<T> {
  constructor(private readonly repository: Repository<T>, private readonly entity: new () => T) { }

  async newId(): Promise<string> {
    return Promise.resolve(ObjectId.generate().toString());
  }

  async toObjectId(id: string): Promise<ObjectId> {
    return Promise.resolve(ObjectId.createFromHexString(id));
  }

  async count(query: any, limit?: number): Promise<number> {
    return await this.repository.count(query);
  }

  async find(): Promise<T[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => plainToInstance(this.entity, entity));
  }

  async findById(id: string): Promise<T> {
    const entity = await this.repository.findOneBy({ id } as any);
    return entity ? plainToInstance(this.entity, entity) : null;
  }

  async createOne(entity: T): Promise<T> {
    const savedEntity = await this.repository.save(entity);
    return plainToInstance(this.entity, savedEntity);
  }

  async deleteById(id: string): Promise<{ acknowledged: boolean; deletedCount: number; }> {
    const result = await this.repository.delete(id);
    return {
      acknowledged: result.affected > 0,
      deletedCount: result.affected || 0,
    };
  }

  async createMany(entities: T[]): Promise<T[]> {
    const savedEntities = await this.repository.save(entities);
    return savedEntities.map(entity => plainToInstance(this.entity, entity));
  }

  async updateMany(query: any, updateQuery: any): Promise<{ matchedCount: number; modifiedCount: number; }> {
    const result = await this.repository.update(query, updateQuery);
    return {
      matchedCount: result.affected || 0,
      modifiedCount: result.affected || 0,
    };
  }

  async updateOne(query: any, updateQuery: any): Promise<{ matchedCount: number; modifiedCount: number; }> {
    return await this.updateOne(query, updateQuery);
  }

  async deleteMany(query: any): Promise<{ acknowledged: boolean; deletedCount: number; }> {
    const result = await this.repository.delete(query);
    return {
      acknowledged: result.affected > 0,
      deletedCount: result.affected || 0,
    };
  }
  
  async aggregate(query: any[], options?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async queryBuilder(builder: (qb: any) => any): Promise<T[]> {
    const entities = await builder(this.repository.createQueryBuilder()).getMany();
    return entities.map(entity => plainToInstance(this.entity, entity));
  }
}