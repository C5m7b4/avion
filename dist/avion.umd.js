(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.avion = {}, global.react));
})(this, (function (exports, react) { 'use strict';

    exports.READY_STATES = void 0;
    (function (READY_STATES) {
        READY_STATES[READY_STATES["UNSEND"] = 0] = "UNSEND";
        READY_STATES[READY_STATES["OPENED"] = 1] = "OPENED";
        READY_STATES[READY_STATES["HEADERS_RECIEVED"] = 2] = "HEADERS_RECIEVED";
        READY_STATES[READY_STATES["LOADING"] = 3] = "LOADING";
        READY_STATES[READY_STATES["DONE"] = 4] = "DONE";
    })(exports.READY_STATES || (exports.READY_STATES = {}));
    const DEFAULT_REQUEST_OPTIONS = {
        ignoreCache: false,
        headers: {
            Accept: 'application/json, text/javascript, text/plain',
        },
        timeout: 0,
    };

    const get = function (url) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
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

    const del = function (url, id) {
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

    const put = function (url, data) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
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

    const post = function (url, data) {
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

    // a queue uses FIFO (first in first out)
    class Queue {
        constructor(capacity = Infinity) {
            this.capacity = capacity;
            this.storage = [];
        }
        enqueue(item) {
            if (this.size() === this.capacity) {
                throw new Error('Queue has reached max capacity, you cannot add more items');
            }
            this.storage.push(item);
        }
        dequeue() {
            return this.storage.shift();
        }
        size() {
            return this.storage.length;
        }
    }

    let enableRequestQueue = false;
    const requestQueue = new Queue();
    // const responseQueue = new Queue();
    // const errorQueue = new Queue();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const onAvionRequestReceived = new CustomEvent('onAvionRequestReceived');
    // window.addEventListener('onRequestReceived', () => {
    //   const firstQueuedItem = requestQueue.dequeue();
    //   console.log('firstQueuedItem', firstQueuedItem);
    //   return firstQueuedItem;
    // });
    function parseXHRResult(xhr) {
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
            // requestQueue.enqueue(result);
            // window.dispatchEvent(onRequestReceived);
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
            // errorQueue.enqueue(result);
            return result;
        }
    }
    function getJson(xhr) {
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
    function errorResponse(xhr, message = null) {
        const result = {
            ok: false,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: message || xhr.statusText,
            json: () => JSON.parse(message || xhr.statusText),
            responseUrl: xhr.responseURL,
        };
        // errorQueue.enqueue(result);
        return result;
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
            if (enableRequestQueue) {
                requestQueue.enqueue(options);
                window.dispatchEvent(onAvionRequestReceived);
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
    avion.get = get;
    avion.post = post;
    avion.put = put;
    avion.del = del;
    avion.enableRequestQueue = (v) => {
        enableRequestQueue = v;
    };
    // this is going to hold all the requests that have come in
    avion.requestQueue = requestQueue;
    // avion.responseQueue = responseQueue;
    // avion.errorQueue = errorQueue;
    avion.onRequestReceived = onAvionRequestReceived;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function fetch(url, method) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = yield avion({
                method,
                cors: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                url: url,
                timeout: 0,
                responseType: 'json',
            });
            return json;
        });
    }
    function fetchWithParams(url, method, headers, responseType = 'json', timeout = 0, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!headers) {
                headers = {
                    ContentType: 'application/json',
                };
            }
            const json = yield avion({
                method,
                headers,
                url,
                responseType,
                timeout,
                data: args,
            });
            return json;
        });
    }

    const useAvion = (url, options) => {
        const [data, setData] = react.useState();
        const [error, setError] = react.useState('');
        const [isLoading, setIsLoading] = react.useState(false);
        const { method, data: args, headers, responseType, timeout } = options;
        react.useEffect(() => {
            if (args) {
                fetchWithParams(url, method, headers, responseType, timeout, args)
                    .then((res) => {
                    handleResponse(res);
                })
                    .catch((err) => {
                    handleError(err);
                });
            }
            else {
                fetch(url, method)
                    .then((res) => {
                    handleResponse(res);
                })
                    .catch((err) => {
                    handleError(err);
                });
            }
            return () => { };
        }, [url]);
        const getKey = (j) => {
            let result = '';
            Object.keys(j).forEach((k) => {
                if (k !== 'error' && k !== 'success' && k !== 'msg') {
                    result = k;
                }
            });
            return result;
        };
        const handleResponse = (res) => {
            setIsLoading(false);
            const j = res.json();
            const key = getKey(j);
            if (j.error === 0) {
                setData(j[key]);
            }
            else {
                setError(j.msg || j.stack);
                setData([]);
            }
        };
        const handleError = (err) => {
            setError(err);
            setIsLoading(false);
            setData([]);
        };
        return [data, error, isLoading];
    };

    const stringify = (e) => {
        const resultArr = [];
        for (const property in e) {
            const line = `${property}=${e[property]}`;
            resultArr.push(line);
        }
        const result = resultArr
            .map((a, i) => {
            if (i === 0) {
                return a;
            }
            else {
                return `&${a}`;
            }
        })
            .join('');
        return result;
    };

    exports.Queue = Queue;
    exports["default"] = avion;
    exports.stringify = stringify;
    exports.useAvion = useAvion;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
