import { ServiceBusClient } from '@azure/service-bus';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Queue } from 'bull';
import { AzureQueueService, BullQueueService } from './impl';
import { QueueProviderModuleOptions } from './queue-provider.module-config';
import { ConfigurableModuleClass } from './queue-provider.module-definition';
import { IQueueService } from './queue.service.interface';


@Module({})
export class QueueProviderModule extends ConfigurableModuleClass {
  static forRoot(options?: QueueProviderModuleOptions): DynamicModule {
    const providers: Provider[] = [];

    if (options) {
      if (options.type === 'azure-service-bus') {
        providers.push({
          provide: IQueueService,
          useFactory: () => {
            const client = new ServiceBusClient(options.url);
            return new AzureQueueService(client, options.queueName);
          },
        });
      } else if (options.type === 'bull') {
        providers.push({
          provide: IQueueService,
          useFactory: (queue: Queue) => new BullQueueService(queue),
          inject: [getQueueToken(options.queueName)],
        });
      }
    }

    const imports = [];
    if (options?.type === 'bull') {
      imports.push(
        BullModule.forRoot({ redis: { host: 'localhost', port: 6379 } }),
        BullModule.registerQueue({ name: options.queueName })
      );
    }

    return {
      module: QueueProviderModule,
      imports: imports,
      providers: providers,
      exports: options ? [IQueueService] : [],
    };
  }
}