import { DEFAULT_REQUEST_OPTIONS } from './interfaces';
import { get } from './Get';
import { del } from './Delete';
import { put } from './Put';
import { post } from './Post';
import { Queue } from './Queue';
export function parseXHRResult(xhr) {
    try {
        const result = {
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.response || xhr.responseText || '',
            json: () => getJson(xhr),
            responseUrl: xhr.responseURL,
        };
        return result;
    }
    catch (error) {
        const result = {
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: '',
            json: () => getJson(xhr),
            responseUrl: xhr.responseURL,
        };
        return result;
    }
}
export function getJson(xhr) {
    try {
        if (xhr.response) {
            return JSON.parse(JSON.stringify(xhr.response));
        }
        else if (xhr.responseText) {
            return JSON.parse(xhr.responseText);
        }
    }
    catch (error) {
        return JSON.parse(JSON.stringify(error));
    }
}
export function errorResponse(xhr, message = null) {
    return {
        ok: false,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        data: message || xhr.statusText,
        json: () => JSON.parse(message || xhr.statusText),
        responseUrl: xhr.responseURL,
    };
}
const avion = (options) => {
    const ignoreCache = options.ignoreCache || DEFAULT_REQUEST_OPTIONS.ignoreCache;
    const headers = options.headers || DEFAULT_REQUEST_OPTIONS.headers;
    const timeout = options.timeout || DEFAULT_REQUEST_OPTIONS.timeout;
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url);
        if (options) {
            if (options.responseType) {
                xhr.responseType = options.responseType;
            }
            else {
                xhr.responseType = 'json';
            }
            if (headers) {
                Object.keys(headers).forEach((key) => {
                    console.log('setting header ' + key);
                    xhr.setRequestHeader(key, headers[key]);
                });
            }
            else {
                if (options.data) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }
            }
        }
        if (ignoreCache) {
            xhr.setRequestHeader('Cache-Control', 'no-cache');
        }
        xhr.timeout = timeout;
        xhr.onload = () => {
            resolve(parseXHRResult(xhr));
        };
        xhr.onerror = () => {
            resolve(errorResponse(xhr, 'Request failed'));
        };
        xhr.ontimeout = () => {
            resolve(errorResponse(xhr, 'Request timed out'));
        };
        if (typeof options.data == 'string') {
            xhr.send(options.data);
        }
        else {
            xhr.send(JSON.stringify(options.data));
        }
    });
};
const avionQueue = new Queue();
avion.get = get;
avion.post = post;
avion.put = put;
avion.del = del;
avion.queue = avionQueue;
export default avion;
