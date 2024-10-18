export abstract class IRepository<T> {
  abstract newId(): Promise<string>;

  abstract toObjectId(id:string): Promise<any>;

  abstract count(query: any, limit?: number): Promise<number>;

  abstract find(query: any, options?: { limit?: number; sort?: any; skip?: number }): Promise<T[]>;
  abstract findOne(query: any, options?: any): Promise<T>;

  abstract create(data: any, options?: any): Promise<T>;
  abstract createMany(data: any[], ordered: boolean): Promise<{ acknowledged: boolean; insertedCount: number; insertedIds: string[] }>;

  abstract update(query: any, updateQuery: any): Promise<{ matched: number; modified: number; }>;
  abstract updateOne(query: any, updateQuery: any, option: any): Promise<{ matched: number; modified: number; }>;

  abstract delete(query: any): Promise<{ acknowledged: boolean; deletedCount: number; }>;

  abstract aggregate(query: any[], options?: any): Promise<any>;
}