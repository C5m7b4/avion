import { VERBS, XhrOptions } from './utils';

const Avion = (options: XhrOptions) => {
  switch (options.method) {
    case VERBS.GET:
      return sendHttpRequest(options.method, options.url, null, options);
      break;
    case VERBS.POST:
      return sendHttpRequest(
        options.method,
        options.url,
        options.data,
        options
      );
      break;
    case VERBS.DELETE:
      return sendHttpRequest(
        options.method,
        options.url,
        options.data,
        options
      );
      break;
    case VERBS.PUT:
      return sendHttpRequest(
        options.method,
        options.url,
        options.data,
        options
      );
      break;
    case VERBS.PATCH:
      return sendHttpRequest(
        options.method,
        options.url,
        options.data,
        options
      );
      break;
    default:
      return sendHttpRequest(options.method, options.url, null, options);
      break;
  }
};

const sendHttpRequest = (
  method: VERBS,
  url: string,
  data?: any,
  options?: XhrOptions
) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onerror = (err) => {
      reject(err);
    };

    if (options) {
      if (options.responseType) {
        xhr.responseType = options.responseType;
      } else {
        xhr.responseType = 'json';
      }
      if (options.headers) {
        for (var propertyname in options.headers) {
          xhr.setRequestHeader(propertyname, options.headers[propertyname]);
        }
      } else {
        if (data) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
      }
    }

    xhr.onload = () => {
      if (xhr.status > 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };
    xhr.send(JSON.stringify(data));
  });

  return promise;
};

export default Avion;
