export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,
    remote_config_url: process.env.REMOTE_CONFIG_URL,
    remote_config: {
        version: process.env.REMOTE_CONFIG_VERSION,
        data: process.env.REMOTE_CONFIG_DATA,
    }
});