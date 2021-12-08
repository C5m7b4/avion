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

const Avion = (options) => {
    switch (options.method) {
        case VERBS.GET:
            return sendHttpRequest(options.method, options.url);
        case VERBS.POST:
            return sendHttpRequest(options.method, options.url, options.data);
        case VERBS.DELETE:
            return sendHttpRequest(options.method, options.url, options.data);
        case VERBS.PUT:
            return sendHttpRequest(options.method, options.url, options.data);
        case VERBS.PATCH:
            return sendHttpRequest(options.method, options.url, options.data);
        default:
            return sendHttpRequest(options.method, options.url);
    }
};
const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onerror = (err) => {
            reject(err);
        };
        xhr.responseType = 'json';
        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
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

export { READY_STATES, VERBS, Avion as default };
