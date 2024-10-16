// azure-queue.service.ts
import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { Injectable } from '@nestjs/common';
import { IQueueService } from '../queue.service.interface';

@Injectable()
export class AzureQueueService implements IQueueService {
  private serviceBusSender: ServiceBusSender;

  constructor(private readonly client: ServiceBusClient, private readonly queueName: string) {
    this.serviceBusSender = this.client.createSender(this.queueName);
  }

  async addJob(data: any): Promise<void> {
    await this.serviceBusSender.sendMessages({ body: data });
  }
}