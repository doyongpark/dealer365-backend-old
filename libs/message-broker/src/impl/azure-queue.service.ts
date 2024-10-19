import { ServiceBusClient, ServiceBusReceivedMessage, ServiceBusReceiver, ServiceBusSender } from '@azure/service-bus';
import { Injectable, Logger } from '@nestjs/common';
import { MessageBrokerModuleOptions } from '../message-broker.option.interface';
import { IBrokerService } from '../message-broker.service.interface';

@Injectable()
export class AzureBrokerService implements IBrokerService {
  private client: ServiceBusClient;
  private sender: ServiceBusSender;
  private receiver: ServiceBusReceiver;
  private readonly maxRetries: number;
  private readonly retryInterval: number;

  constructor(private readonly options: MessageBrokerModuleOptions) {
    this.maxRetries = options.maxRetries ?? 5;
    this.retryInterval = options.retryInterval ?? 5000; // Default to 5 seconds
    this.initializeServiceBus();
  }

  private async initializeServiceBus() {
    let retries = 0;
    while (retries < this.maxRetries) {
      try {
        if (this.options.url) {
          this.client = new ServiceBusClient(this.options.url);
          this.sender = this.client.createSender(this.options.queueName);

          if (this.options.useListener) {
            this.receiver = this.client.createReceiver(this.options.queueName);
          }
          Logger.debug('Connected to Azure Service Bus');
          break;
        }
      } catch (error) {
        retries++;
        Logger.error(`Failed to connect to Azure Service Bus. Retry ${retries}/${this.maxRetries}`, error);
        await this.delay(this.retryInterval);
      }
    }

    if (retries === this.maxRetries) {
      Logger.error('Max retries reached. Could not connect to Azure Service Bus.');
    }
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async closeReceiver(): Promise<void> {
    await this.receiver?.close();
  }

  async closeClient(): Promise<void> {
    await this.client.close();
  }

  async receiveMessage(handler: (message: any) => boolean): Promise<void> {
    if (this.options.useListener) {
      this.receiver.subscribe({
        processMessage: async (message: ServiceBusReceivedMessage) => {
          try {
            const result = await handler(message.body);
            if (result)
              await this.receiver.completeMessage(message);
            else
              await this.receiver.abandonMessage(message);
          } catch (handlerError) {
            Logger.error('Handler processing failed', handlerError);
            await this.receiver.abandonMessage(message);
          }
        },
        processError: async (err) => {
          Logger.error('Error receiving message: ', err);
          // Retry logic if the receiver encounters an error
          await this.initializeServiceBus();
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