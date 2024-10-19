import { LeadDto } from "../../dtos/leads/lead.dto";

export abstract class ILeadService {
  abstract search(filter?: any): Promise<LeadDto[]>;
  abstract get(id: string): Promise<LeadDto>;
  abstract update(id: string, dto: Partial<LeadDto>): Promise<LeadDto>;
  abstract create(dto: Partial<LeadDto>): Promise<LeadDto>;
  abstract delete(id: string): Promise<void>;
}