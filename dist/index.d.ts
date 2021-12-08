declare const Avion: (options: XhrOptions) => Promise<unknown>;
export default Avion;

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

export declare interface XhrOptions {
    url: string;
    method: VERBS;
    cors?: boolean;
    data: any;
}

export { }
