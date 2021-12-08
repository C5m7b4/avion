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

export interface XhrOptions {
  url: string;
  method: VERBS;
  cors?: boolean;
  data: any;
  headers: any;
  responseType: XMLHttpRequestResponseType;
}

export interface HeaderInterface {
  key: string;
  value: string;
}

export const splitHeader = (header: string): HeaderInterface => {
  const args = header.split('.');
  return {
    key: args[0],
    value: args[1],
  };
};
