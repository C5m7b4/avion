import { parseXHRResult, errorResponse } from './avion';
import { AvionResult } from './interfaces';

export const put = function (url: string, data: any) {
  return new Promise<AvionResult>((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);

    xhr.onload = () => {
      resolve(parseXHRResult(xhr));
    };

    xhr.onerror = () => {
      resolve(errorResponse(xhr, 'Request failed'));
    };

    xhr.ontimeout = () => {
      resolve(errorResponse(xhr, 'Request timed out'));
    };

    xhr.send(JSON.stringify(data));
  });
};
