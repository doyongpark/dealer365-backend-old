import { ServiceBusReceivedMessage } from '@azure/service-bus';
import { IRepository } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { LeadDto } from '@dealer365-backend/package-crm';
import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class JobCrmService implements OnModuleInit, OnModuleDestroy {

  constructor(
    private readonly brokerService: IBrokerService,
    @Inject('LeadRepository') private readonly leadRepository: IRepository<LeadDto>
  ) { }

  async onModuleInit() {
    this.brokerService.receiveMessage(this.processMessage.bind(this));
  }

  async onModuleDestroy() {
    await this.brokerService.closeReceiver();
    await this.brokerService.closeClient();
  }

  private async processMessage(message: ServiceBusReceivedMessage) {
    Logger.debug(`Message processing in job-crm, message: ${JSON.stringify(message)}`);
    // Add your message processing logic here
    const result = await this.leadRepository.find({});
    Logger.debug(`Result from repository: ${JSON.stringify(result)}`);
  }
}