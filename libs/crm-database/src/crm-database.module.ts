import { CrmEntity } from '@dealer365-backend/shared';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelForClass } from '@typegoose/typegoose';
import { ConnectionManager } from './connection.manager';
import { ICrmRepository } from './crm.repository.interface';
import { MongoCrmRepository } from './mongo/mongo.crm.repository';
import { SqlCrmRepository } from './sql/sql.crm.repository';

@Global()
@Module({
  providers: [ConnectionManager],
  exports: [ConnectionManager],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: ICrmRepository,
          useFactory: async (configService: ConfigService, connectionManager: ConnectionManager) => {
            const dbType = configService.get<string>('DB_TYPE');
            const host = configService.get<string>('DB_HOST');
            const tenant = configService.get<string>('DB_TENANT');
            if (dbType === 'mongodb') {
              const uri = configService.get<string>('MONGO_URI');
              const dbName = tenant ? `${host}_${tenant}` : host;
              const connection = await connectionManager.getMongoConnection(`${uri}/${dbName}`);
              const model = getModelForClass(CrmEntity, { existingConnection: connection });
              return new MongoCrmRepository(model);
            } else if (dbType === 'postgresql') {
              const config = {
                type: 'postgres',
                host: configService.get<string>('PG_HOST'),
                port: configService.get<number>('PG_PORT'),
                username: configService.get<string>('PG_USER'),
                password: configService.get<string>('PG_PASSWORD'),
                database: tenant ? `${host}_${tenant}` : host,
                entities: [CrmEntity],
                synchronize: true,
              };
              const connection = await connectionManager.getPgConnection(config);
              const repository = connection.getRepository(CrmEntity);
              return new SqlCrmRepository(repository);
            }
          },
          inject: [ConfigService, ConnectionManager],
        },
      ],
      exports: [ICrmRepository],
    };
  }
}