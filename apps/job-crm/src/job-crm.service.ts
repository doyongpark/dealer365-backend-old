import { ServiceBusReceivedMessage } from '@azure/service-bus';
import { IRepository } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { LeadDto } from '@dealer365-backend/package-crm';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class JobCrmService implements OnModuleInit, OnModuleDestroy {

  constructor(private readonly brokerService: IBrokerService,
    private readonly repository: IRepository<LeadDto>
  ) {
    Logger.debug('JobCrmService has been constructor.');
  }

  async onModuleInit() {
    this.brokerService.receiveMessage(this.processMessage.bind(this));
    Logger.debug('JobCrmService has been onModuleInit.');
  }

  async onModuleDestroy() {
    await this.brokerService.closeReceiver();
    await this.brokerService.closeClient();
    Logger.debug('JobCrmService has been destroyed.');
  }

  private async processMessage(message: ServiceBusReceivedMessage) {
    Logger.debug(`Message processing in job-crm, message: ${JSON.stringify(message.body)}`);
    // Add your message processing logic here
    const result = await this.repository.findAll();
    Logger.debug(`Result from repository: ${JSON.stringify(result)}`);
  }
}