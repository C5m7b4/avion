import { useState, useEffect } from 'react';
import { fetch, fetchWithParams } from './helpers';
import { XhrOptions, AvionResult } from '.';

const useAvion = <T>(url: string, options: XhrOptions) => {
  const [data, setData] = useState<T[] | null>();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    } else {
      fetch(url, method)
        .then((res) => {
          handleResponse(res);
        })
        .catch((err) => {
          handleError(err);
        });
    }
    return () => {};
  }, [url]);

  const getKey = (j: any) => {
    let result = '';
    Object.keys(j).forEach((k) => {
      if (k !== 'error' && k !== 'success' && k !== 'msg') {
        result = k;
      }
    });
    return result;
  };

  const handleResponse = (res: AvionResult) => {
    setIsLoading(false);
    const j: any = res.json();
    const key = getKey(j);
    if (j.error === 0) {
      setData(j[key]);
    } else {
      setError(j.msg || j.stack);
      setData([]);
    }
  };

  const handleError = (err: any) => {
    setError(err);
    setIsLoading(false);
    setData([]);
  };

  return [data, error, isLoading];
};

export default useAvion;
