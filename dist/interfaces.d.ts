export declare enum READY_STATES {
    UNSEND = 0,
    OPENED = 1,
    HEADERS_RECIEVED = 2,
    LOADING = 3,
    DONE = 4
}
export declare type VERB = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
export declare type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
export interface XhrOptions {
    url: string;
    method: VERB;
    cors?: boolean;
    data?: any;
    headers: any;
    responseType: ResponseType;
    ignoreCache?: boolean;
    timeout?: number;
    get?: () => AvionResult;
    post?: () => AvionResult;
    put?: () => AvionResult;
    del?: () => AvionResult;
}
export interface HeaderInterface {
    key: string;
    value: string;
}
export interface RequestOptions {
    ignoreCache?: boolean;
    headers?: {
        [key: string]: string;
    };
    timeout: number;
}
export declare const DEFAULT_REQUEST_OPTIONS: RequestOptions;
export interface AvionResult {
    ok: boolean;
    status: number;
    statusText: string;
    data: string;
    json: <T>() => T;
    headers: string;
    responseUrl: string;
}
export interface AvionResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string | number | boolean>;
    request?: any;
}
export interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
}
export interface AvionPromise<T = any> extends Promise<AvionResponse<T>> {
}
