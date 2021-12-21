import avion, { parseXHRResult, errorResponse } from './avion';
export const del = (avion.del = function (url, id) {
    return new Promise((resolve, reject) => {
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
