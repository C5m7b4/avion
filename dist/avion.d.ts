import { XhrOptions, AvionResult } from './interfaces';
export declare function parseXHRResult(xhr: XMLHttpRequest): AvionResult;
export declare function errorResponse(xhr: XMLHttpRequest, message?: string | null): AvionResult;
declare const avion: {
    (options: XhrOptions): Promise<AvionResult>;
    get(url: string): void;
    post(url: string, data: any): void;
    put(url: string, data: any): void;
    del(url: string, id: string): void;
};
export default avion;
