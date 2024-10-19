export abstract class IRepository<T> {
  abstract newId(): Promise<string>;
  abstract toObjectId(id: string): Promise<any>;
  abstract count(query: any, limit?: number): Promise<number>;
  abstract find(query: any, options?: { limit?: number; sort?: any; skip?: number }): Promise<T[]>;
  abstract findById(id: string): Promise<T>;
  abstract createOne(data: Partial<T>, options?: any): Promise<T>;
  abstract createMany(data: Partial<T>[], ordered: boolean): Promise<T[]>;
  abstract updateOne(query: any, updateQuery: any, option: any): Promise<{ matchedCount: number; modifiedCount: number; }>;
  abstract updateMany(query: any, updateQuery: any): Promise<{ matchedCount: number; modifiedCount: number; }>;
  abstract deleteById(id: string): Promise<{ acknowledged: boolean; deletedCount: number; }>;
  abstract deleteMany(query: any): Promise<{ acknowledged: boolean; deletedCount: number; }>;
  abstract aggregate(query: any[], options?: any): Promise<T[]>;
  abstract queryBuilder(builder: (qb: any) => any): Promise<T[]>
}