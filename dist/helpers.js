var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import avion from './avion';
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
export { fetch, fetchWithParams };
