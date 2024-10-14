import { Injectable } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import { connect, Connection as MongooseConnection } from 'mongoose';

@Injectable()
export class ConnectionManager {
  private mongoConnections: Map<string, MongooseConnection> = new Map();
  private pgConnections: Map<string, Connection> = new Map();

  async getMongoConnection(uri: string): Promise<MongooseConnection> {
    if (!this.mongoConnections.has(uri)) {
      const connection = await connect(uri);
      this.mongoConnections.set(uri, connection.connection);
    }
    return this.mongoConnections.get(uri);
  }

  async getPgConnection(config: any): Promise<Connection> {
    const key = `${config.host}:${config.port}:${config.database}`;
    if (!this.pgConnections.has(key)) {
      const connection = await createConnection(config);
      this.pgConnections.set(key, connection);
    }
    return this.pgConnections.get(key);
  }
}