// filter.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { CheckInServiceModuleOptions } from './check-in-service-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<CheckInServiceModuleOptions>()
    .setClassMethodName('forRoot')
    .build();