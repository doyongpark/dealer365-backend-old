import { FindOneOptions, ObjectId, Repository } from 'typeorm';
import { IRepository } from '../repository.interface';

export class IPostgresRepository<T> extends IRepository<T> {
  newId(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  count(query: any, limit?: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
  find(query: any, options: { limit?: number; sort?: any; skip?: number; }): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  findOne(query: any, options: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
  create(data: any, options: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createMany(data: any[], ordered: boolean): Promise<{ acknowledged: boolean; insertedCount: number; insertedIds: string[]; }> {
    throw new Error('Method not implemented.');
  }
  update(query: any, updateQuery: any): Promise<{ matched: number; modified: number; }> {
    throw new Error('Method not implemented.');
  }
  updateOne(query: any, updateQuery: any, option: any): Promise<{ matched: number; modified: number; }> {
    throw new Error('Method not implemented.');
  }
  delete(query: any): Promise<{ acknowledged: boolean; deletedCount: number; }> {
    throw new Error('Method not implemented.');
  }
  aggregate(query: any[], options: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly repository: Repository<T>) {
    super();
  }
}