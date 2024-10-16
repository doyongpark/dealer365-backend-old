import { QueueProviderModuleOptions } from "@dealer365-backend/queue-provider";

export interface PackageCrmModuleOptions {
    databaseOptions: {
        type: 'mongodb' | 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
        url: string;        
        database: string;
    }
    useQueue: boolean;
    queueOptions?: QueueProviderModuleOptions
}