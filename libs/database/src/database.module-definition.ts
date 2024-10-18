import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DatabaseModuleOptions } from './database-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<DatabaseModuleOptions>()
  .setClassMethodName('forRoot')
  .build();