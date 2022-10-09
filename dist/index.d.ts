declare const avion: {
    (options: XhrOptions): Promise<AvionResult>;
    get: (url: string) => Promise<AvionResult>;
    post: (url: string, data: any) => Promise<AvionResult>;
    put: (url: string, data: any) => Promise<AvionResult>;
    del: (url: string, id: string) => Promise<AvionResult>;
    requestQueue: Queue<unknown>;
    responseQueue: Queue<unknown>;
    errorQueue: Queue<unknown>;
};
export default avion;

export declare interface AvionPromise<T = any> extends Promise<AvionResponse<T>> {
}

export declare interface AvionResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string | number | boolean>;
    request?: any;
}

export declare interface AvionResult {
    ok: boolean;
    status: number;
    statusText: string;
    data: string;
    json: <T>() => T;
    headers: string;
    responseUrl: string;
}

export declare interface HeaderInterface {
    key: string;
    value: string;
}

export declare interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
}

export declare class Queue<T> implements IQueue<T> {
    private capacity;
    private storage;
    constructor(capacity?: number);
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
}

export declare enum READY_STATES {
    UNSEND = 0,
    OPENED = 1,
    HEADERS_RECIEVED = 2,
    LOADING = 3,
    DONE = 4
}

export declare interface RequestOptions {
    ignoreCache?: boolean;
    headers?: {
        [key: string]: string;
    };
    timeout: number;
}

declare type ResponseType_2 = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
export { ResponseType_2 as ResponseType }

export declare const stringify: (e: any) => string;

export declare const useAvion: <T>(url: string, options: XhrOptions) => (string | boolean | T[] | null | undefined)[];

export declare type VERB = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';

export declare interface XhrOptions {
    url: string;
    method: VERB;
    cors?: boolean;
    data?: any;
    headers: any;
    responseType: ResponseType_2;
    ignoreCache?: boolean;
    timeout?: number;
    get?: () => AvionResult;
    post?: () => AvionResult;
    put?: () => AvionResult;
    del?: () => AvionResult;
}

export { }
