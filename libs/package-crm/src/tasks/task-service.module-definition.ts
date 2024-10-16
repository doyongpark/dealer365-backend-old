// filter.module-definition.ts
import { ConfigurableModuleBuilder } from '@nestjs/common';
import { TaskServiceModuleOptions } from './task-service-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<TaskServiceModuleOptions>()
    .setClassMethodName('forRoot')
    .build();