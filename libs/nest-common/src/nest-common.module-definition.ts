// nest-common.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestCommonModuleOptions } from './nest-common-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<NestCommonModuleOptions>()
    .setClassMethodName('forRoot')
    .build();