export interface PackageCrmModuleOptions {
    databaseOptions: {
        type: string;
        url: string;
    }
    useBroker?: boolean;
    brokerOptions?: {
        type: string;
        url: string;
        useListener?: boolean;
    }
}