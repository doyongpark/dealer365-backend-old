import { BullModule, getQueueToken } from '@nestjs/bull';
import { ConfigurableModuleBuilder, DynamicModule, Module, Provider } from '@nestjs/common';
import { Queue } from 'bull';
import { AzureBrokerService, BullBrokerService } from './impl';
import { MessageBrokerModuleOptions } from './message-broker.option.interface';
import { IBrokerService } from './message-broker.service.interface';

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<MessageBrokerModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

@Module({})
export class MessageBrokerModule extends ConfigurableModuleClass {
  static forRoot(options?: MessageBrokerModuleOptions): DynamicModule {
    const imports = [];
    const providers: Provider[] = [];

    if (options) {
      if (options.type === 'azure-service-bus') {
        providers.push({
          provide: IBrokerService,
          useFactory: () => {
            return new AzureBrokerService(options);
          },
        });
      } else if (options.type === 'bull') {
        imports.push(
          BullModule.forRoot({ redis: { host: 'localhost', port: 6379 } }),
          BullModule.registerQueue({ name: options.queueName })
        );
        providers.push({
          provide: IBrokerService,
          useFactory: (queue: Queue) => {
            return new BullBrokerService(options, queue);
          },
          inject: [getQueueToken(options.queueName)],
        });
      }
    }

    return {
      module: MessageBrokerModule,
      imports: imports,
      providers: providers,
      exports: options ? [IBrokerService] : [],
    };
  }
}