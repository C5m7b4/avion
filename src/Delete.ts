import { XhrOptions } from '.';
import avion, { parseXHRResult, errorResponse } from './avion';
import { AvionResult } from './interfaces';

export const del = (avion.del = function (url: string, id: string) {
  return new Promise<AvionResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url + '/' + id);

    xhr.onload = (evt) => {
      resolve(parseXHRResult(xhr));
    };

    xhr.onerror = (evt) => {
      resolve(errorResponse(xhr, 'Request failed'));
    };

    xhr.ontimeout = (evt) => {
      resolve(errorResponse(xhr, 'Request timed out'));
    };

    xhr.send();
  });
});
