import { VERBS } from './utils';
const Avion = (options) => {
    switch (options.method) {
        case VERBS.GET:
            return sendHttpRequest(options.method, options.url);
            break;
        case VERBS.POST:
            return sendHttpRequest(options.method, options.url, options.data);
            break;
        case VERBS.DELETE:
            return sendHttpRequest(options.method, options.url, options.data);
            break;
        case VERBS.PUT:
            return sendHttpRequest(options.method, options.url, options.data);
            break;
        case VERBS.PATCH:
            return sendHttpRequest(options.method, options.url, options.data);
            break;
        default:
            return sendHttpRequest(options.method, options.url);
            break;
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
export default Avion;
