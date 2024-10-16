// filter.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DealServiceModuleOptions } from './deal-service-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<DealServiceModuleOptions>()
    .setClassMethodName('forRoot')
    .build();