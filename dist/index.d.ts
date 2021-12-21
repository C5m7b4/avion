declare const avion: {
    (options: XhrOptions): Promise<AvionResult>;
    get(url: string): void;
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
}

export { }
