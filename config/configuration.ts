export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,
    api_service: {
        create: process.env.CREATE_SERVICE_NAME,
        update: process.env.UPDATE_SERVICE_NAME,
        delete: process.env.DELETE_SERVICE_NAME,
        query: process.env.QUERY_SERVICE_NAME,
    },
    remote_config_url: process.env.REMOTE_CONFIG_SERVER_URL,
    config: {}
});

export interface IApiService {
    create: string;
    update: string;
    delete: string;
    query: string;
}