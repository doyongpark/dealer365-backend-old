import { CreateLeadDto, LeadDto, UpdateLeadDto } from "../dtos";

export abstract class ILeadRepository {
  abstract find(filter?: any): Promise<LeadDto[]>;
  abstract findOne(id: string): Promise<LeadDto>;
  abstract updateOne(id: string, dto: UpdateLeadDto): Promise<{ updated: boolean, updatedCount: number }>;
  abstract createOne(dto: CreateLeadDto): Promise<LeadDto>;
  abstract deleteOne(id: string): Promise<{ deleted: boolean, deletedCount: number }>;
}