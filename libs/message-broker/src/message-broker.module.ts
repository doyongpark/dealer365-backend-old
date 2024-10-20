import { BullModule, getQueueToken } from '@nestjs/bull';
import { ConfigurableModuleBuilder, DynamicModule, Module, Provider } from '@nestjs/common';
import { Queue } from 'bull';
import { AzureBrokerService, BullBrokerService } from './impl';
import { IBrokerService } from './impl/broker.service.interface';
import { MessageBrokerModuleOptions } from './message-broker.option.interface';

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<MessageBrokerModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

@Module({})
export class MessageBrokerModule extends ConfigurableModuleClass {
  static forRoot(options: MessageBrokerModuleOptions): DynamicModule {

    const imports = [];
    const providers: Provider[] = [];

    if (options.messageBrokerType?.toLowerCase() === 'azure-service-bus') {
      providers.push({
        provide: IBrokerService,
        useFactory: () => { return new AzureBrokerService(options.messageBrokerOptions); },
      });
    } else if (options.messageBrokerType?.toLowerCase() === 'bull') {
      imports.push(
        BullModule.forRoot({ redis: { host: 'localhost', port: 6379 } }),
        BullModule.registerQueue({ name: options.messageBrokerOptions?.queueName })
      );
      providers.push({
        provide: IBrokerService,
        useFactory: (queue: Queue) => { return new BullBrokerService(options.messageBrokerOptions, queue); },
        inject: [getQueueToken(options.messageBrokerOptions?.queueName)],
      });
    }

    return {
      module: MessageBrokerModule,
      imports: imports,
      providers: providers,
      exports: [IBrokerService],
    };
  }
}