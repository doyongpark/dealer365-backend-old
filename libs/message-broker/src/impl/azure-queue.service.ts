// azure-queue.service.ts
import { ServiceBusClient, ServiceBusReceiver, ServiceBusSender } from '@azure/service-bus';
import { Injectable, Logger } from '@nestjs/common';
import { IBrokerService } from '../message-broker.service.interface';

@Injectable()
export class AzureBrokerService implements IBrokerService {
  private readonly sender: ServiceBusSender;
  private readonly receiver: ServiceBusReceiver;

  constructor(private readonly client: ServiceBusClient, private readonly queueName: string, private readonly isListening?: boolean) {
    this.sender = this.client.createSender(this.queueName);
    if (isListening)
      this.receiver = this.client.createReceiver(this.queueName);
  }
  async receiveMessage(handler: (message: any) => void): Promise<void> {
    if (this.isListening) {
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
  }

  async sendMessage(job: any): Promise<void> {
    Logger.debug(`Sending job to Azure Service Bus queue: ${this.queueName}`);
    Logger.debug(`Job details: ${JSON.stringify(job)}`);
    await this.sender.sendMessages({ body: job });
  }
}