import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as mongoose from 'mongoose';
import { DatabaseModuleOptions } from './database-config.interface';
import { ConfigurableModuleClass } from './database.module-definition';
import { IMongoRepository } from './impl/mongo.repository';

@Module({})
export class DatabaseModule extends ConfigurableModuleClass {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    const imports = [];
    const providers = [];

    if (options.type === 'mongodb') {
      imports.push(MongooseModule.forRoot(options.url, {
        connectionFactory: (connection) => {
          mongoose.set('debug', true); // Mongoose 디버그 모드 활성화
          return connection;
        },
      }));
      options.models.forEach(model => {
        imports.push(MongooseModule.forFeature([{ name: model.name, schema: model.schema }]));
        providers.push({
          provide: `${model.name}Repository`,
          useFactory: (model) => new IMongoRepository(model),
          inject: [getModelToken(model.name)],
        });
      });
    } else if (options.type === 'postgres') {
      imports.push(TypeOrmModule.forRoot({
        type: 'postgres',
        url: options.url,
        entities: options.entities,
        synchronize: false,
        logging: true, // TypeORM 쿼리 로깅 활성화
      }));
      options.entities.forEach(entity => {
        providers.push({
          provide: `${entity.name}Repository`,
          useFactory: (entity) => new IMongoRepository(entity),
          inject: [getModelToken(entity.name)],
        });
      });
    }

    return {
      module: DatabaseModule,
      imports: imports,
      providers: providers,
      exports: providers,
    };
  }
}