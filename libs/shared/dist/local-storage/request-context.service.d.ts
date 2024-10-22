import { AsyncLocalStorage } from 'async_hooks';
export declare class RequestContextService {
    static readonly asyncLocalStorage: AsyncLocalStorage<Map<string, any>>;
    static run(callback: () => void): void;
    static set(key: string, value: any): void;
    static get<T>(key: string): T | undefined;
    static getUserContext<T>(): T | undefined;
    static getUserInfo(): {
        userId: string;
        userName: string;
    } | undefined;
    static getRequestIds(): {
        correlationId: string;
        requestId: string;
    } | undefined;
}
