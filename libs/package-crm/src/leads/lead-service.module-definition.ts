// filter.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { LeadServiceModuleOptions } from './lead-service-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<LeadServiceModuleOptions>()
    .setClassMethodName('forRoot')
    .build();