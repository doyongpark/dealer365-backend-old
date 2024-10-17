// azure-queue.service.ts
import { ServiceBusClient, ServiceBusReceiver, ServiceBusSender } from '@azure/service-bus';
import { Injectable, Logger } from '@nestjs/common';
import { MessageBrokerModuleOptions } from '../message-broker.module-config';
import { IBrokerService } from '../message-broker.service.interface';

@Injectable()
export class AzureBrokerService implements IBrokerService {
  private readonly client: ServiceBusClient;
  private readonly sender: ServiceBusSender;
  private readonly receiver: ServiceBusReceiver;

  constructor(private readonly options: MessageBrokerModuleOptions) {

    if (options.url) {
      this.client = new ServiceBusClient(options.url);
      this.sender = this.client.createSender(options.queueName);

      if (options.useListener) {
        this.receiver = this.client.createReceiver(options.queueName);
      } 
    }
  }
  async closeReceiver(): Promise<void> {
    await this.receiver?.close();
  }
  async closeClient(): Promise<void> {
    await this.client.close();
  }
  async receiveMessage(handler: (message: any) => void): Promise<void> {
    if (this.options.useListener) {
      // Logger.debug(`Receiving messages from Azure Service Bus queue: ${this.options.queueName}`);
      this.receiver.subscribe({
        processMessage: async (message) => {
          // Logger.debug(`Received message: ${JSON.stringify(message.body)}`);
          handler(message.body);
        },
        processError: async (err) => {
          Logger.debug(`Error receiving message: ${err}`);
        },
      });
    }
  }

  async sendMessage(job: any): Promise<void> {
    Logger.debug(`Sending job to Azure Service Bus queue: ${this.options.queueName}`);
    Logger.debug(`Job details: ${JSON.stringify(job)}`);
    await this.sender.sendMessages({ body: job });
  }
}