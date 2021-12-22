import avion, { parseXHRResult, errorResponse } from './avion';
import { AvionResult } from './interfaces';

export const post = function (url: string, data: any) {
  return new Promise<AvionResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = (evt) => {
      resolve(parseXHRResult(xhr));
    };

    xhr.onerror = (evt) => {
      resolve(errorResponse(xhr, 'Request failed'));
    };

    xhr.ontimeout = (evt) => {
      resolve(errorResponse(xhr, 'Request timed out'));
    };

    xhr.send(JSON.stringify(data));
  });
};
