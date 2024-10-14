import { IRepository } from "@dealer365-backend/shared";

export abstract class ICrmRepository implements IRepository {
  abstract newId(): Promise<string>;
  abstract count(): Promise<number>;
  abstract find(): Promise<any[]>;
  abstract findById(id: string): Promise<any>;
  abstract create(data: any): Promise<any>;
  abstract update(id: string, data: any): Promise<number>;
  abstract delete(id: string): Promise<number>;

  // 추가적인 CRM 관련 메서드를 정의할 수 있습니다.
  abstract findByEmail(email: string): Promise<any>;
}