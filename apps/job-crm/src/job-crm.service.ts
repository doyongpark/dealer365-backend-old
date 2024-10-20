import { ServiceBusReceivedMessage } from '@azure/service-bus';
import { IRepository } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { Lead, LEAD_REPOSITORY } from '@dealer365-backend/shared';
import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class JobCrmService implements OnModuleInit, OnModuleDestroy {

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

  private async processMessage(message: ServiceBusReceivedMessage) {
    Logger.debug(`Message processing in job-crm, message: ${JSON.stringify(message.body)}`);
    // Add your message processing logic here

    const lead = plainToClass(Lead, message.body.data);
    lead._id = message.body.id;

    const result = await this.leadRepository.createOne(lead);
    Logger.debug(`Result from repository: ${JSON.stringify(result)}`);
  }
}