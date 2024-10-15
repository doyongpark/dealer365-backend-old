// interceptor.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { InterceptorModuleOptions } from './interceptor-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<InterceptorModuleOptions>()
    .setClassMethodName('forRoot')
    .build();