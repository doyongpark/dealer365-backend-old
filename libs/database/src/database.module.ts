import { ConfigurableModuleBuilder, DynamicModule, Logger, Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import * as mongoose from 'mongoose';
import { DatabaseModuleOptions } from './database.option.interface';
import { TypeOrmRepository } from './impl';
import { MongoRepository } from './impl/mongo.repository';

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<DatabaseModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

@Module({})
export class DatabaseModule extends ConfigurableModuleClass {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    const imports = [];
    const providers = [];

    if (options.type === 'mongodb') {
      imports.push(MongooseModule.forRoot(options.connectionString, {
        connectionFactory: (connection) => {
          if (options.useLogging) {
            // Enable Mongoose debug mode
            mongoose.set('debug', (collectionName: string, methodName: string, ...methodArgs: any[]) => {
              const formattedArgs = methodArgs.map(arg => JSON.stringify(arg)).join(', ');
              const message = `${collectionName}.${methodName}(${formattedArgs})`;
              Logger.debug(message, 'Mongoose');
            });
          }
          //mongoose.set('debug', options.useLogging);
          return connection;
        },
      }));
      options.models.forEach(model => {
        imports.push(MongooseModule.forFeature([{ name: model.name, schema: model.schema }]));
        providers.push({
          provide: `${model.name?.toUpperCase()}_REPOSITORY`, // 리포지토리의 토큰 정의
          useFactory: (model) => new MongoRepository(model, model.entity), // MongoRepository 인스턴스 생성
          inject: [getModelToken(model.name)], // Mongoose 모델 인젝션
        });
      });
    } else if (options.type === 'postgres') {
      imports.push(TypeOrmModule.forRoot({
        type: 'postgres',
        url: options.connectionString,
        entities: options.entities,
        synchronize: false,
        logging: options.useLogging, // TypeORM 쿼리 로깅 활성화
      }));
      options.entities.forEach(entity => {
        providers.push({
          provide: `${entity.name.toUpperCase()}_REPOSITORY`, // 리포지토리의 토큰 정의
          useFactory: (repository) => new TypeOrmRepository(repository, entity), // TypeOrmRepository 인스턴스 생성
          inject: [getRepositoryToken(entity.name)], // TypeORM 엔티티 인젝션
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
