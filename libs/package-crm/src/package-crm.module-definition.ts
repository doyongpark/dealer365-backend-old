// nest-common.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { PackageCrmModuleOptions } from './package-crm-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<PackageCrmModuleOptions>()
    .setClassMethodName('forRoot')
    .build();