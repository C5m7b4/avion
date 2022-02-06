import { parseXHRResult, errorResponse } from './avion';
export const del = function (url, id) {
    return new Promise((resolve) => {
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
