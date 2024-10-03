import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({})
export class MongoDatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: MongoDatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('database.connectionString'),
          }),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
