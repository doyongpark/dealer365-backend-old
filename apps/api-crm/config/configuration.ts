export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    remote: process.env.REMOTE_CONFIG_SERVER_URL,
    port: parseInt(process.env.PORT, 10) || 3000,
    service: {
        create: process.env.CRM_DEFAULT_CREATE_DOC_SERVICE_NAME,
        update: process.env.CRM_DEFAULT_UPDATE_DOC_SERVICE_NAME,
        delete: process.env.CRM_DEFAULT_DELETE_DOC_SERVICE_NAME,
        query: process.env.CRM_DEFAULT_QUERY_DOC_SERVICE_NAME,
    }
});