import { VERB, ResponseType } from './interfaces';
declare function fetch(url: string, method: VERB): Promise<import("./interfaces").AvionResult>;
declare function fetchWithParams(url: string, method: VERB, headers: any, responseType: ResponseType | undefined, timeout: number | undefined, args: any): Promise<import("./interfaces").AvionResult>;
export { fetch, fetchWithParams };
