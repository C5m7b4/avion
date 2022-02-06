import { parseXHRResult, errorResponse } from './avion';
export const post = function (url, data) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
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
