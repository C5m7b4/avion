import { parseXHRResult, errorResponse } from './avion';
export const post = function (url, data) {
    return new Promise((resolve, reject) => {
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
