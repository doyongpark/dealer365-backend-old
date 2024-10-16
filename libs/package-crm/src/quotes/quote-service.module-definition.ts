// filter.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { QuoteServiceModuleOptions } from './quote-service-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<QuoteServiceModuleOptions>()
    .setClassMethodName('forRoot')
    .build();