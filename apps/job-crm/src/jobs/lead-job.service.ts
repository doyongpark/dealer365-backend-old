import { ServiceBusReceivedMessage } from '@azure/service-bus';
import { IRepository } from '@dealer365-backend/database';
import { IBrokerService } from '@dealer365-backend/message-broker';
import { Lead, LEAD_REPOSITORY, MESSAGE_ID } from '@dealer365-backend/shared';
import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IntegratedCrmRepository } from '../repositories/integrated-crm.repository';
import { TransactionalCrmRepository } from '../repositories/transactional-crm.repository';

@Injectable()
export class LeadJobService implements OnModuleInit, OnModuleDestroy {

  constructor(
    private readonly brokerService: IBrokerService,
    @Inject(LEAD_REPOSITORY) private readonly leadRepository: IRepository<Lead>,
    private readonly transactionalCrmRepository: TransactionalCrmRepository,
    private readonly integratedCrmRepository: IntegratedCrmRepository,
    
  ) { }

  async onModuleInit() {
    this.brokerService.receiveMessage(this.processMessage.bind(this));
  }

  async onModuleDestroy() {
    await this.brokerService.closeReceiver();
    await this.brokerService.closeClient();
  }

  private async processMessage(message: ServiceBusReceivedMessage) {
    Logger.debug(`Message processing in job-crm, message: ${JSON.stringify(message)}`, this.constructor.name);

    let result = null;
    const lead = await this.leadRepository.findById(message.body._id);

    switch (message.messageId) {
      case MESSAGE_ID.LEAD_CREATE:
        if (lead) {
          throw new Error(`Lead with id ${message.body._id} already exists`);
        }
        const newlead = plainToClass(Lead, message.body.data);
        newlead._id = message.body._id;
        result = await this.leadRepository.createOne(newlead);

        // this.integratedCrmRepository.createLeads(newlead, newlead)
        // this.transactionalCrmRepository.createLeads(newlead, newlead);
        break;
      case MESSAGE_ID.LEAD_UPDATE:
        if (!lead) {
          throw new Error(`Lead with id ${message.body._id} does not exist`);
        }
        const mergedLead = Object.assign(lead, plainToClass(Lead, message.body.data));
        result = await this.leadRepository.updateOne({ _id: message.body._id }, mergedLead);
        break;
      case MESSAGE_ID.LEAD_DELETE:
        if (!lead) {
          throw new Error(`Lead with id ${message.body._id} does not exist`);
        }
        result = await this.leadRepository.deleteById(message.body._id);
        break;
    }

    Logger.debug(`Result from repository: ${JSON.stringify(result)}`, this.constructor.name);
  }
}