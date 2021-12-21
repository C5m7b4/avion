export enum READY_STATES {
  UNSEND,
  OPENED,
  HEADERS_RECIEVED,
  LOADING,
  DONE,
}

export enum VERBS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text';

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
  timeout: 5000,
};

export interface AvionResult {
  ok: boolean;
  status: number;
  statusText: string;
  data: string;
  json: <T>() => T;
  headers: string;
}
