// filter.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { FilterModuleOptions } from './filter-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<FilterModuleOptions>()
    .setClassMethodName('forRoot')
    .build();