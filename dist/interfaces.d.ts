export declare enum READY_STATES {
    UNSEND = 0,
    OPENED = 1,
    HEADERS_RECIEVED = 2,
    LOADING = 3,
    DONE = 4
}
export declare enum VERBS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}
export declare type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
export interface XhrOptions {
    url: string;
    method: VERBS;
    cors?: boolean;
    data: any;
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
}
