var READY_STATES;
(function (READY_STATES) {
    READY_STATES[READY_STATES["UNSEND"] = 0] = "UNSEND";
    READY_STATES[READY_STATES["OPENED"] = 1] = "OPENED";
    READY_STATES[READY_STATES["HEADERS_RECIEVED"] = 2] = "HEADERS_RECIEVED";
    READY_STATES[READY_STATES["LOADING"] = 3] = "LOADING";
    READY_STATES[READY_STATES["DONE"] = 4] = "DONE";
})(READY_STATES || (READY_STATES = {}));
var VERBS;
(function (VERBS) {
    VERBS["GET"] = "GET";
    VERBS["POST"] = "POST";
    VERBS["PUT"] = "PUT";
    VERBS["PATCH"] = "PATCH";
    VERBS["DELETE"] = "DELETE";
})(VERBS || (VERBS = {}));
const DEFAULT_REQUEST_OPTIONS = {
    ignoreCache: false,
    headers: {
        Accept: 'applicaiton/json, text/javascript, text/plain',
    },
    timeout: 5000,
};

const get = function (url) {
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

const del = function (url, id) {
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
};

const put = function (url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url);
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

const post = function (url, data) {
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

function parseXHRResult(xhr) {
    return {
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        data: xhr.response || xhr.responseText,
        json: () => JSON.parse(xhr.responseText),
    };
}
function errorResponse(xhr, message = null) {
    return {
        ok: false,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        data: message || xhr.statusText,
        json: () => JSON.parse(message || xhr.statusText),
    };
}
const avion = (options) => {
    const ignoreCache = options.ignoreCache || DEFAULT_REQUEST_OPTIONS.ignoreCache;
    const headers = options.headers || DEFAULT_REQUEST_OPTIONS.headers;
    const timeout = options.timeout || DEFAULT_REQUEST_OPTIONS.timeout;
    return new Promise((resolve, reject) => {
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
                Object.keys(options).forEach((key) => xhr.setRequestHeader(key, headers[key]));
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
        xhr.onload = (evt) => {
            resolve(parseXHRResult(xhr));
        };
        xhr.onerror = (evt) => {
            resolve(errorResponse(xhr, 'Request failed'));
        };
        xhr.ontimeout = (evt) => {
            resolve(errorResponse(xhr, 'Request timed out'));
        };
        xhr.send(JSON.stringify(options.data));
    });
};
avion.get = get;
avion.post = post;
avion.put = put;
avion.del = del;

export { READY_STATES, VERBS, avion as default };
