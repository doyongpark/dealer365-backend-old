import { CreateLeadDto, LeadDto, UpdateLeadDto } from "../dtos";

export abstract class ILeadService {
  abstract search(filter?: any): Promise<LeadDto[]>;
  abstract get(id: string): Promise<LeadDto>;
  abstract update(id: string, dto: UpdateLeadDto): Promise<{ updated: boolean, updatedCount: number }>;
  abstract create(dto: CreateLeadDto): Promise<LeadDto>;
  abstract delete(id: string): Promise<{ deleted: boolean, deletedCount: number }>;
}