export interface IRepository {
  newId(): Promise<string>;
  count(): Promise<number>;
  find(): Promise<any[]>;
  findById(id: string): Promise<any>;
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<number>;
  delete(id: string): Promise<number>;
}