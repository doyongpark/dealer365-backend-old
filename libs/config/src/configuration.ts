import { parseBoolean } from "@dealer365-backend/shared";

export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,
    remote_config_url: process.env.REMOTE_CONFIG_URL,
    remote_config: {
        version: parseInt(process.env.REMOTE_CONFIG_VERSION, 10) || 1,
        row_data: process.env.REMOTE_CONFIG_DATA,
    },
    middleware: {
        crm: {
            use_correlation: parseBoolean(process.env.USE_CORRELATION_MIDDLEWARE, true),
            use_method_override: parseBoolean(process.env.USE_METHOD_OVERRIDE_MIDDLEWARE, true),
            use_user_context: parseBoolean(process.env.USE_USER_CONTEXT_MIDDLEWARE, true),
        }
    },
    interceptor: {
        crm: {
            use_audit_log: parseBoolean(process.env.USE_RESPONSE_AUDITLOG_INTERCEPTOR, true),
            use_response_transform: parseBoolean(process.env.USE_RESPONSE_TRANSFORM_INTERCEPTOR, true),
        }
    },
    logger: {
        provider: process.env.LOG_PROVIDER || 'winston',
        type: process.env.LOG_TYPE || 'console',
        format: process.env.LOG_FORMAT || 'json',
        level: process.env.LOG_LEVEL || 'info',
    }
});