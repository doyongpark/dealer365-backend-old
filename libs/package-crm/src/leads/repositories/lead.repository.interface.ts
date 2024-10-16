import { CreateLeadDto, LeadDto, UpdateLeadDto } from "../dtos";

export abstract class ILeadRepository {
  abstract find(filter?: any): Promise<LeadDto[]>;
  abstract findOne(id: string): Promise<LeadDto>;
  abstract updateOne(id: string, dto: UpdateLeadDto): Promise<LeadDto>;
  abstract createOne(dto: CreateLeadDto): Promise<LeadDto>;
  abstract deleteOne(id: string): Promise<void>;
}