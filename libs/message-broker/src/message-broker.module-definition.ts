import { ConfigurableModuleBuilder } from '@nestjs/common';
import { MessageBrokerModuleOptions } from './message-broker.module-config';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<MessageBrokerModuleOptions>()
  .setClassMethodName('forRoot')
  .build();