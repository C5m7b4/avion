declare const avion: {
    (options: XhrOptions): Promise<AvionResult>;
    get(url: string): void;
    post(url: string, data: any): void;
    put(url: string, data: any): void;
    del(url: string, id: string): void;
};
export default avion;

export declare interface AvionResult {
    ok: boolean;
    status: number;
    statusText: string;
    data: string;
    json: <T>() => T;
    headers: string;
}

export declare const del: (url: string, id: string) => Promise<AvionResult>;

export declare const get: (url: string) => Promise<AvionResult>;

export declare interface HeaderInterface {
    key: string;
    value: string;
}

export declare const post: (url: string, data: any) => Promise<AvionResult>;

export declare const put: (url: string, data: any) => Promise<AvionResult>;

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
