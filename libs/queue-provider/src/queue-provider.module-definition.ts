import { ConfigurableModuleBuilder } from '@nestjs/common';
import { QueueProviderModuleOptions } from './queue-provider.module-config';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<QueueProviderModuleOptions>()
  .setClassMethodName('forRoot')
  .build();