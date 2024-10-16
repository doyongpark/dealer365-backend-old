import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { IRepository } from './repository.interface';

export class IPostgresRepository<T> extends IRepository<T> {
  constructor(private readonly repository: Repository<T>) {
    super();
  }

  async create(item: DeepPartial<T>): Promise<T> {
    return this.repository.save(item);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: string, options?: FindOneOptions<T>): Promise<T> {
    return null;
  }

  async update(id: string, item: DeepPartial<T>): Promise<T> {
    return null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}