// azure-queue.service.ts
import { ServiceBusClient, ServiceBusReceiver, ServiceBusSender } from '@azure/service-bus';
import { Injectable, Logger } from '@nestjs/common';
import { IQueueService } from '../queue.service.interface';

@Injectable()
export class AzureQueueService implements IQueueService {
  private readonly sender: ServiceBusSender;
  private readonly receiver: ServiceBusReceiver;

  constructor(private readonly client: ServiceBusClient, private readonly queueName: string) {
    this.sender = this.client.createSender(this.queueName);
    this.receiver = this.client.createReceiver(this.queueName);
  }
  async receiveMessages(handler: (message: any) => void): Promise<void> {
    Logger.debug(`Receiving messages from Azure Service Bus queue: ${this.queueName}`);
    this.receiver.subscribe({
      processMessage: async (message) => {
        Logger.debug(`Received message: ${JSON.stringify(message.body)}`);
        handler(message.body);
      },
      processError: async (err) => {
        Logger.debug(`Error receiving message: ${err}`);
      },
    });
  }

  async addJob(job: any): Promise<void> {
    Logger.debug(`Sending job to Azure Service Bus queue: ${this.queueName}`);
    Logger.debug(`Job details: ${JSON.stringify(job)}`);
    await this.sender.sendMessages({ body: job });
  }
}