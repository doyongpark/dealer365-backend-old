// guard.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { GuardModuleOptions } from './guard-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<GuardModuleOptions>()
    .setClassMethodName('forRoot')
    .build();