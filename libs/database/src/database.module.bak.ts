/*
이 파일은 삭제 예정입니다. 
- 이 모듈은 동적으로 'XXXXRepository'를 생성하는 기능을 제공합니다.
- 다수 개의 Entity를 동시에 다루는 경우에 유용합니다.
- 일단은 IRepository를 사용하기 위해 다른 모듈을 참조하도록 합니다.
*/

// import { ConfigurableModuleBuilder, DynamicModule, Module } from '@nestjs/common';
// import { MongooseModule, getModelToken } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import * as mongoose from 'mongoose';
// import { IMongoRepository } from './mongo.repository';
// import { IPostgresRepository } from './postres.repository';

// interface DatabaseModuleOptions {
//   type: 'mongodb' | 'postgres';
//   uri: string;
//   entities?: any[];
//   models?: any[];
// }

// const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<DatabaseModuleOptions>()
//   .setClassMethodName('forRoot')
//   .build();

// @Module({})
// export class DatabaseModule extends ConfigurableModuleClass {
//   static forRoot(options: DatabaseModuleOptions): DynamicModule {
//     const imports = [];
//     const providers = [];

//     if (options.type === 'mongodb') {
//       imports.push(MongooseModule.forRoot(options.uri, {
//         connectionFactory: (connection) => {
//           mongoose.set('debug', true); // Mongoose 디버그 모드 활성화
//           return connection;
//         },
//       }));
//       options.models.forEach(model => {
//         imports.push(MongooseModule.forFeature([{ name: model.name, schema: model.schema }]));
//         providers.push({
//           provide: `${model.name}Repository`,
//           useFactory: (model) => new IMongoRepository(model),
//           inject: [getModelToken(model.name)],
//         });
//       });
//     } else if (options.type === 'postgres') {
//       imports.push(TypeOrmModule.forRoot({
//         type: 'postgres',
//         url: options.uri,
//         entities: options.entities,
//         synchronize: false,
//         logging: true, // TypeORM 쿼리 로깅 활성화
//       }));
//       options.entities.forEach(entity => {
//         imports.push(TypeOrmModule.forFeature([entity]));
//         providers.push({
//           provide: `${entity.name}Repository`,
//           useClass: IPostgresRepository,
//           inject: [entity],
//         });
//       });
//     }

//     return {
//       module: DatabaseModule,
//       imports: imports,
//       providers: providers,
//       exports: providers,
//     };
//   }
// }