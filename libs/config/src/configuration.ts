export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,
    remote_config: {
        version: process.env.CONFIG_VERSION,
        url: process.env.REMOTE_CONFIG_SERVER_URL,
        data: process.env.REMOTE_CONFIG_DATA,
    }
});

export interface IConfig {
    url: string,
    data: string
}