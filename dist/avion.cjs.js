'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.READY_STATES = void 0;
(function (READY_STATES) {
    READY_STATES[READY_STATES["UNSEND"] = 0] = "UNSEND";
    READY_STATES[READY_STATES["OPENED"] = 1] = "OPENED";
    READY_STATES[READY_STATES["HEADERS_RECIEVED"] = 2] = "HEADERS_RECIEVED";
    READY_STATES[READY_STATES["LOADING"] = 3] = "LOADING";
    READY_STATES[READY_STATES["DONE"] = 4] = "DONE";
})(exports.READY_STATES || (exports.READY_STATES = {}));
exports.VERBS = void 0;
(function (VERBS) {
    VERBS["GET"] = "GET";
    VERBS["POST"] = "POST";
    VERBS["PUT"] = "PUT";
    VERBS["PATCH"] = "PATCH";
    VERBS["DELETE"] = "DELETE";
})(exports.VERBS || (exports.VERBS = {}));

const Avion = (options) => {
    switch (options.method) {
        case exports.VERBS.GET:
            return sendHttpRequest(options.method, options.url, null, options);
        case exports.VERBS.POST:
            return sendHttpRequest(options.method, options.url, options.data, options);
        case exports.VERBS.DELETE:
            return sendHttpRequest(options.method, options.url, options.data, options);
        case exports.VERBS.PUT:
            return sendHttpRequest(options.method, options.url, options.data, options);
        case exports.VERBS.PATCH:
            return sendHttpRequest(options.method, options.url, options.data, options);
        default:
            return sendHttpRequest(options.method, options.url, null, options);
    }
};
const sendHttpRequest = (method, url, data, options) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onerror = (err) => {
            reject(err);
        };
        if (options) {
            if (options.responseType) {
                xhr.responseType = options.responseType;
            }
            else {
                xhr.responseType = 'json';
            }
            if (options.headers) {
                for (var propertyname in options.headers) {
                    xhr.setRequestHeader(propertyname, options.headers[propertyname]);
                }
            }
            else {
                if (data) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }
            }
        }
        xhr.onload = () => {
            if (xhr.status > 400) {
                reject(xhr.response);
            }
            else {
                resolve(xhr.response);
            }
        };
        xhr.send(JSON.stringify(data));
    });
    return promise;
};

exports["default"] = Avion;
