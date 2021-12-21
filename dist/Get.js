import avion, { parseXHRResult, errorResponse } from './avion';
avion.get = function (url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
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
};
