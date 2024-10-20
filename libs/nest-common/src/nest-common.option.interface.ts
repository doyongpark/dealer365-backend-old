import { FilterModuleOptions } from "./filters";
import { GuardModuleOptions } from "./guards";
import { InterceptorModuleOptions } from "./interceptors";
import { MiddlewareModuleOptions } from "./middlewares";

export interface NestCommonModuleOptions {
    exceptionFilterOptions?: FilterModuleOptions;
    interceptorOptions?: InterceptorModuleOptions;
    guardOptions?: GuardModuleOptions;
    middlewareOptions?: MiddlewareModuleOptions;
}