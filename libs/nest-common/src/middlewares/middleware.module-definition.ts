// middleware.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { MiddlewareModuleOptions } from './middleware-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<MiddlewareModuleOptions>()
    .setClassMethodName('forRoot')
    .build();