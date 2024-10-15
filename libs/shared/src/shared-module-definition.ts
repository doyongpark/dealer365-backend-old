// nest-common.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { SharedModuleOptions } from './shared-module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<SharedModuleOptions>()
    .setClassMethodName('forRoot')
    .build();