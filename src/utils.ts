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
}
