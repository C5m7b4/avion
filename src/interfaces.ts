export enum READY_STATES {
  UNSEND,
  OPENED,
  HEADERS_RECIEVED,
  LOADING,
  DONE,
}

// export enum VERBS {
//   GET = 'GET',
//   POST = 'POST',
//   PUT = 'PUT',
//   PATCH = 'PATCH',
//   DELETE = 'DELETE',
// }

export type VERB = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';

export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text';

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
  headers?: { [key: string]: string };
  timeout: number;
}

export const DEFAULT_REQUEST_OPTIONS: RequestOptions = {
  ignoreCache: false,
  headers: {
    Accept: 'applicaiton/json, text/javascript, text/plain',
  },
  timeout: 0,
};

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

export interface AvionPromise<T = any> extends Promise<AvionResponse<T>> {}
