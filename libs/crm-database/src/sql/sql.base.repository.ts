import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ICrmRepository } from '../crm.repository.interface';

export abstract class SqlBaseRepository extends ICrmRepository {
  constructor(protected repository: Repository<any>) {
    super();
  }

  async newId(): Promise<string> {
    return uuidv4() 
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async find(): Promise<any[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<any> {
    return this.repository.findOne({ where: { id } });
  }

  async create(data: any): Promise<any> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: string, data: any): Promise<number> {
    const result = await this.repository.update(id, data);
    return result.affected;
  }

  async delete(id: string): Promise<number> {
    const result = await this.repository.delete(id);
    return result.affected;
  }

  async findByEmail(email: string): Promise<any> {
    return this.repository.findOne({ where: { email } });
  }
}