import { IMongoRepository } from '@dealer365-backend/database/mongo.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateLeadDto, LeadDto, UpdateLeadDto } from '../dtos';
import { LeadEntity } from '../entities';
import { ILeadService } from './lead.service.interface';

@Injectable()
export class LeadSyncService implements ILeadService {
    constructor(@Inject('LeadRepository') private readonly leadRepository: IMongoRepository<LeadEntity>) { }

    async get(id: string): Promise<LeadDto> {
        const result = await this.leadRepository.findOne(id);
        return result;
    }

    async update(id: string, dto: UpdateLeadDto): Promise<LeadEntity> {
        const reulst = await this.leadRepository.update(id, {
            firstName: dto.firstName,
            fullName: dto.fullName,
            comment: dto.comment,
            addresses: dto.addresses,
            contacts: dto.contacts,
            isConvertedToContact: dto.isConvertedToContact,
        });

        return reulst;
    }

    async create(dto: CreateLeadDto): Promise<LeadDto> {
        const result = await this.leadRepository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            fullName: dto.fullName,
            comment: dto.comment,
            addresses: dto.addresses,
            contacts: dto.contacts,
            isConvertedToContact: false,
        });

        return result;
    }

    async delete(id: string): Promise<void> {
        return await this.leadRepository.delete(id);
    }

    async search(filter?: any): Promise<LeadDto[]> {
        return await this.leadRepository.findAll();
    }
}