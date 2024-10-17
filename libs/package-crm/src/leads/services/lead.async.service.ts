import { IRepository } from '@dealer365-backend/database';
import { IQueueService } from '@dealer365-backend/queue-provider';
import { Injectable, Logger } from '@nestjs/common';
import { CreateLeadDto, LeadDto, UpdateLeadDto } from '../dtos';
import { ILeadService } from './lead.service.interface';

@Injectable()
export class LeadAsyncService implements ILeadService {
    constructor(private readonly leadRepository: IRepository<LeadDto>,
        private readonly leadQueueService: IQueueService,
    ) { }

    async onModuleInit() {
        await this.leadQueueService.receiveMessages(this.handleMessage.bind(this));
    }

    private async handleMessage(message: any) {
        // 메시지 처리 로직을 여기에 작성합니다.
        Logger.debug(`Processing message: ${JSON.stringify(message)}`);
        // 예: 메시지를 데이터베이스에 저장하거나 다른 작업 수행
    }

    async create(dto: CreateLeadDto): Promise<LeadDto> {
        const result = await this.leadRepository.create(dto);

        this.leadQueueService.addJob({
            correlationId: 'new-correlation-id',
            messageId: result.id,
            subject: 'create',
            body: result,
        });
        return result;
    }

    async search(filter?: any): Promise<LeadDto[]> {
        return await this.leadRepository.findAll();
    }

    async get(id: string): Promise<LeadDto> {
        const result = await this.leadRepository.findOne(id);
        return result;
    }

    async update(id: string, dto: UpdateLeadDto): Promise<LeadDto> {
        const result = await this.leadRepository.update(id, dto);
        this.leadQueueService.addJob({
            correlationId: 'new-correlation-id',
            messageId: result.id,
            subject: 'update',
            body: dto,
        });
        return result;
    }

    async delete(id: string): Promise<void> {
        const result = await this.leadRepository.delete(id);
        this.leadQueueService.addJob({
            correlationId: 'new-correlation-id',
            messageId: id,
            subject: 'delete',
            body: id,
        });
    }
}