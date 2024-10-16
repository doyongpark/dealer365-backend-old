import { parseBoolean } from "@dealer365-backend/shared";

export const testConfiguration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,
    remote_config_url: process.env.REMOTE_CONFIG_URL,
    remote_config: {
        version: parseInt(process.env.REMOTE_CONFIG_VERSION, 10) || 1,
        row_data: process.env.REMOTE_CONFIG_DATA,
    },
    crm: {
        use_correlation_middleware: parseBoolean(process.env.USE_CORRELATION_MIDDLEWARE, true),
        use_method_override_middleware: parseBoolean(process.env.USE_METHOD_OVERRIDE_MIDDLEWARE, true),
        use_user_context_middleware: parseBoolean(process.env.USE_USER_CONTEXT_MIDDLEWARE, true),
        use_audit_log_interceptor: parseBoolean(process.env.USE_RESPONSE_AUDITLOG_INTERCEPTOR, true),
        use_response_transform_interceptor: parseBoolean(process.env.USE_RESPONSE_TRANSFORM_INTERCEPTOR, true),
        use_http_exception_filter: parseBoolean(process.env.USE_HTTP_EXCEPTION_FILTER, true),
        auth_guard_type: process.env.AUTH_GUARD_TYPE || 'keycloak',
        resource_guard_type: process.env.RESOURCE_GUARD_TYPE || 'keycloak',
    },
    logger: {
        provider: process.env.LOGGER_PROVIDER || 'nest',
        type: process.env.LOGGER_TYPE || 'console',
        format: process.env.LOGGER_FORMAT || 'json',
        level: process.env.LOGGER_LEVEL || 'debug',
    }
});