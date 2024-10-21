import { ServiceBusMessage } from '@azure/service-bus';
import { IRepository } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { Lead, LEAD_REPOSITORY, MESSAGE_ID } from '@dealer365-backend/shared';
import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class LeadDeleteJobService implements OnModuleInit, OnModuleDestroy {

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
    
    Logger.debug(`LeadDeleteJobService: message: ${JSON.stringify(message.body)}`, this.constructor.name);
    // Add your message processing logic here
    if (message.messageId == MESSAGE_ID.LEAD_DELETE) {
      Logger.debug(`Message processing in job-crm, message: ${JSON.stringify(message.body)}`, this.constructor.name);

      const result = await this.leadRepository.deleteById(message.body.id);

      Logger.debug(`Result from repository: ${JSON.stringify(result)}`, this.constructor.name);
    }
  }
}