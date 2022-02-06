import { parseXHRResult, errorResponse } from './avion';
import { AvionResult } from './interfaces';

export const del = function (url: string, id: string) {
  return new Promise<AvionResult>((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url + '/' + id);

    xhr.onload = () => {
      resolve(parseXHRResult(xhr));
    };

    xhr.onerror = () => {
      resolve(errorResponse(xhr, 'Request failed'));
    };

    xhr.ontimeout = () => {
      resolve(errorResponse(xhr, 'Request timed out'));
    };

    xhr.send();
  });
};
