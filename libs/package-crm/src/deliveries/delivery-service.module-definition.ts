// filter.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DeliveryServiceModuleOptions } from './delivery-service-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<DeliveryServiceModuleOptions>()
    .setClassMethodName('forRoot')
    .build();