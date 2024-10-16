// filter.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { AccountServiceModuleOptions } from './account-service-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<AccountServiceModuleOptions>()
    .setClassMethodName('forRoot')
    .build();