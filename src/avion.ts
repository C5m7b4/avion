import {
  VERBS,
  XhrOptions,
  ResponseType,
  AvionResult,
  DEFAULT_REQUEST_OPTIONS,
} from './interfaces';

export function parseXHRResult(xhr: XMLHttpRequest): AvionResult {
  return {
    ok: xhr.status >= 200 && xhr.status < 300,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: xhr.response || xhr.responseText,
    json: <T>() => JSON.parse(xhr.responseText),
  };
}

export function errorResponse(
  xhr: XMLHttpRequest,
  message: string | null = null
): AvionResult {
  return {
    ok: false,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: message || xhr.statusText,
    json: <T>() => JSON.parse(message || xhr.statusText) as T,
  };
}

const avion = (options: XhrOptions) => {
  const ignoreCache =
    options.ignoreCache || DEFAULT_REQUEST_OPTIONS.ignoreCache;
  const headers = options.headers || DEFAULT_REQUEST_OPTIONS.headers;
  const timeout = options.timeout || DEFAULT_REQUEST_OPTIONS.timeout;

  return new Promise<AvionResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);

    if (options) {
      if (options.responseType) {
        xhr.responseType = options.responseType;
      } else {
        xhr.responseType = 'json';
      }
      if (headers) {
        Object.keys(options).forEach((key) =>
          xhr.setRequestHeader(key, headers[key])
        );
      } else {
        if (options.data) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
      }
    }

    if (ignoreCache) {
      xhr.setRequestHeader('Cache-Control', 'no-cache');
    }

    xhr.timeout = timeout;

    xhr.onload = (evt) => {
      resolve(parseXHRResult(xhr));
    };

    xhr.onerror = (evt) => {
      resolve(errorResponse(xhr, 'Request failed'));
    };

    xhr.ontimeout = (evt) => {
      resolve(errorResponse(xhr, 'Request timed out'));
    };

    xhr.send(JSON.stringify(options.data));
  });
};

avion.get = function (url: string) {};
avion.post = function (url: string, data: any) {};
avion.put = function (url: string, data: any) {};

export default avion;
