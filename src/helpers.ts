import avion from './avion';
import { VERB, ResponseType } from './interfaces';

async function fetch(url: string, method: VERB) {
  const json = await avion({
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
}

async function fetchWithParams(
  url: string,
  method: VERB,
  headers: any,
  responseType: ResponseType = 'json',
  timeout = 0,
  args: any
) {
  if (!headers) {
    headers = {
      ContentType: 'application/json',
    };
  }
  const json = await avion({
    method,
    headers,
    url,
    responseType,
    timeout,
    data: args,
  });
  return json;
}

export { fetch, fetchWithParams };
