import { Model, Types } from 'mongoose';
import { ICrmRepository } from '../crm.repository.interface';

export abstract class MongoBaseRepository extends ICrmRepository {
  constructor(protected model: Model<any>) {
    super();
  }

  async newId(): Promise<string> {
    return new Types.ObjectId().toString();
  }

  async count(): Promise<number> {
    return this.model.countDocuments().exec();
  }

  async find(): Promise<any[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<any> {
    return this.model.findById(id).exec();
  }

  async create(data: any): Promise<any> {
    const created = new this.model(data);
    return created.save();
  }

  async update(id: string, data: any): Promise<number> {
    const result = await this.model.updateOne({ _id: id }, data).exec();
    return result.modifiedCount;
  }

  async delete(id: string): Promise<number> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    return result.deletedCount;
  }

  async findByEmail(email: string): Promise<any> {
    return this.model.findOne({ email }).exec();
  }
}