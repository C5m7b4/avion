import { XhrOptions, AvionResult } from './interfaces';
export declare function parseXHRResult(xhr: XMLHttpRequest): AvionResult;
export declare function getJson(xhr: XMLHttpRequest): any;
export declare function errorResponse(xhr: XMLHttpRequest, message?: string | null): AvionResult;
declare const avion: {
    (options: XhrOptions): Promise<AvionResult>;
    get: (url: string) => Promise<AvionResult>;
    post: (url: string, data: any) => Promise<AvionResult>;
    put: (url: string, data: any) => Promise<AvionResult>;
    del: (url: string, id: string) => Promise<AvionResult>;
    onRequestReceived: CustomEvent<unknown>;
};
export default avion;
