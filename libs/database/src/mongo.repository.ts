import { Document, Model, UpdateQuery } from 'mongoose';
import { IRepository } from './repository.interface';

export class IMongoRepository<T> extends IRepository<T> {
  constructor(private readonly model: Model<Document>) {
    super();
  }

  async create(item: T): Promise<T> {
    const document = convertToDocument(this.model, item);
    const createdDocument = await document.save();
    return convertToPlainObject<T>(createdDocument);
  }

  async findAll(): Promise<T[]> {
    const documents = await this.model.find().exec();
    return documents.map(doc => convertToPlainObject<T>(doc));
  }

  async findOne(id: string): Promise<T> {
    const document = await this.model.findById(id).exec();
    return convertToPlainObject<T>(document);
  }

  async update(id: string, item: UpdateQuery<T>): Promise<T> {
    const document = await this.model.findByIdAndUpdate(id, item, { new: true }).exec();
    return convertToPlainObject<T>(document);
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}

// 변환 함수들
function convertToDocument<T>(model: Model<Document>, plainObject: T): Document {
  return new model(plainObject);
}

function convertToPlainObject<T>(document: Document): T {
  const plainObject = document.toObject();
  delete plainObject.__v;
  return plainObject as T;
}