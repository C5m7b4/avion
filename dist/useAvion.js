import { useState, useEffect } from 'react';
import { fetch, fetchWithParams } from './helpers';
const useAvion = (url, options) => {
    const [data, setData] = useState();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { method, data: args, headers, responseType, timeout } = options;
    useEffect(() => {
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
export default useAvion;
