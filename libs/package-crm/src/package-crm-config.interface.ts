import { QueueProviderModuleOptions } from "@dealer365-backend/queue-provider";

export interface PackageCrmModuleOptions {
    databaseOptions: {
        type: 'mongo' | 'postgre';
        url: string;        
        database: string;
    }
    useQueue: boolean;
    queueOptions?: QueueProviderModuleOptions
}