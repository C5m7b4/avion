import { useState, useEffect } from 'react';
import avion from './avion';
import { VERBS } from './interfaces';

const useAvion = <T>(
  url: string,
  method: VERBS,
  headers = { 'Content-Type': 'application/json' },
  ...args: any
) => {
  const [data, setData] = useState<T[] | null>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let json = await avion({
        method: method,
        headers: headers,
        url: url,
        data: args,
        responseType: 'json',
      });
      return json;
    };
    fetchData()
      .then((res) => {
        setIsLoading(false);
        const j: any = res.json();
        if (j.error === 0) {
          setData(j.items);
        } else {
          setError(j.msg);
          setData([]);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        setData([]);
      });
  }, [url]);

  return [data, error, isLoading] as const;
};

export default useAvion;
