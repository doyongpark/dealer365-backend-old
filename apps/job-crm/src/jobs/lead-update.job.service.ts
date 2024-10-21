import { ServiceBusMessage } from '@azure/service-bus';
import { IRepository } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { Lead, LEAD_REPOSITORY, MESSAGE_ID } from '@dealer365-backend/shared';
import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LeadUpdateJobService implements OnModuleInit, OnModuleDestroy {

  constructor(
    private readonly brokerService: IBrokerService,
    @Inject(LEAD_REPOSITORY) private readonly leadRepository: IRepository<Lead>
  ) { }

  async onModuleInit() {
    this.brokerService.receiveMessage(this.processMessage.bind(this));
  }

  async onModuleDestroy() {
    await this.brokerService.closeReceiver();
    await this.brokerService.closeClient();
  }

  private async processMessage(message: ServiceBusMessage) {
    
    Logger.debug(`LeadUpdateJobService: message: ${JSON.stringify(message.body)}`, this.constructor.name);
    // Add your message processing logic here
    if (message.messageId == MESSAGE_ID.LEAD_UPDATE) {
      Logger.debug(`Message processing in job-crm, message: ${JSON.stringify(message.body)}`, this.constructor.name);

      const lead = await this.leadRepository.findById(message.body.id);
      const newLead = Object.assign(lead, plainToClass(Lead, message.body.data));
      const result = await this.leadRepository.updateOne({ _id: message.body.id }, newLead);

      Logger.debug(`Result from repository: ${JSON.stringify(result)}`, this.constructor.name);
    }
  }
}