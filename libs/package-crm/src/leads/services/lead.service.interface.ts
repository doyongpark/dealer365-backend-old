import { Lead } from "@dealer365-backend/shared";

export abstract class ILeadService {
  abstract search(query?: any): Promise<Lead[]>;
  abstract get(id: string): Promise<Lead>;
  abstract update(id: string, data: Partial<Lead>): Promise<Lead>;
  abstract create(data: Partial<Lead>): Promise<Lead>;
  abstract delete(id: string): Promise<void>;
}