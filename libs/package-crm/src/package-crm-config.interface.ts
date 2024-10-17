export interface PackageCrmModuleOptions {
    databaseOptions: {
        type: 'mongodb' | 'postgres';
        url: string;
        database: string;
    }
    useBroker: boolean;
    brokerOptions?: {
        type: 'azure-service-bus' | 'bull';
        url: string;
    }
}