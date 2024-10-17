import { FindOneOptions, ObjectId, Repository } from 'typeorm';
import { IRepository } from './repository.interface';

export class IPostgresRepository<T> extends IRepository<T> {
  constructor(private readonly repository: Repository<T>) {
    super();
  }

  newId(): string {
    return ObjectId.generate().toString();
  }

  async create(item: T): Promise<T> {
    return this.repository.save(item);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: string, options?: FindOneOptions<T>): Promise<T> {
    return null;
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    return null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}