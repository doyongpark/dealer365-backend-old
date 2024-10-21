import { ServiceBusClient, ServiceBusReceivedMessage, ServiceBusReceiver, ServiceBusSender } from '@azure/service-bus';
import { Injectable, Logger } from '@nestjs/common';
import { MessageBrokerOptions } from './broker.option.interface';
import { IBrokerService } from './broker.service.interface';

@Injectable()
export class AzureBrokerService implements IBrokerService {
  private client: ServiceBusClient;
  private sender: ServiceBusSender;
  private receiver: ServiceBusReceiver;
  private readonly maxRetries: number;
  private readonly retryInterval: number;

  constructor(private readonly options: MessageBrokerOptions) {
    this.maxRetries = !isNaN(options.connectionMaxRetry) ? options.connectionMaxRetry : 5;
    this.retryInterval = !isNaN(options.connectionRetryInterval) ? options.connectionRetryInterval : 10000;
    this.initializeServiceBus();
  }

  private async initializeServiceBus() {
    let retries = 0;
    while (retries < this.maxRetries) {
      try {
        if (this.options.connectionString) {
          this.client = new ServiceBusClient(this.options.connectionString);
          this.sender = this.client.createSender(this.options.queueName);

          if (this.options.useListener) {
            this.receiver = this.client.createReceiver(this.options.queueName);
          }
          Logger.debug('Connected to Azure Service Bus', this.constructor.name);
          break;
        }
      } catch (error) {
        retries++;
        Logger.error(`Failed to connect to Azure Service Bus. Retry ${retries}/${this.maxRetries}`, error, this.constructor.name);
        await this.delay(this.retryInterval);
      }
    }

    if (retries === this.maxRetries) {
      Logger.error('Max retries reached. Could not connect to Azure Service Bus.', this.constructor.name);
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

  async receiveMessage(handler: (message: any) => void): Promise<void> {
    if (this.options.useListener) {
      this.receiver.subscribe({
        processMessage: async (message: ServiceBusReceivedMessage) => {
          try {
            await handler(message.body);
            await this.receiver.completeMessage(message);
          } catch (handlerError) {
            Logger.error('Handler processing failed', handlerError, this.constructor.name);
            await this.receiver.abandonMessage(message);
          }
        },
        processError: async (err) => {
          Logger.error('Error receiving message: ', err, this.constructor.name);
          // Retry logic if the receiver encounters an error
          await this.initializeServiceBus();
        },
      });
    }
  }

  async sendMessage(job: any): Promise<void> {
    Logger.debug(`Sending job to Azure Service Bus queue: ${this.options.queueName}`, this.constructor.name);
    Logger.debug(`Job details: ${JSON.stringify(job)}`, this.constructor.name);
    await this.sender.sendMessages({ body: job });
  }
}