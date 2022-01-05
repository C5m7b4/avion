declare const avion: {
    (options: XhrOptions): Promise<AvionResult>;
    get: (url: string) => Promise<AvionResult>;
    post: (url: string, data: any) => Promise<AvionResult>;
    put: (url: string, data: any) => Promise<AvionResult>;
    del: (url: string, id: string) => Promise<AvionResult>;
};
export default avion;

export declare interface AvionPromise<T = any> extends Promise<AvionResponse<T>> {
}

export declare interface AvionResponse<T = any, D = any> {
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

export declare enum VERBS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

export declare interface XhrOptions {
    url: string;
    method: VERBS;
    cors?: boolean;
    data: any;
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
