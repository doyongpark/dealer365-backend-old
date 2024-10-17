export interface PackageCrmModuleOptions {
    databaseOptions: {
        type: 'mongodb' | 'postgres';
        url: string;
        database: string;
    }
    useQueue: boolean;
    queueOptions?: {
        type: 'azure-service-bus' | 'bull';
        url: string;
    }
}