export type Constructor<I> = new (...args: any[]) => I;
export declare function PaginationRequestDto(defaultLimit?: number, maxLimit?: number): Constructor<any>;
