
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// eslint-disable-next-line no-undef
export type RequestOptions = RequestInit & {
  cacheKey?: string;
  useCache?: boolean;
}

const cache = new Map<string, unknown>();

const request = async <T>(
  url: string,
  method: HttpMethod,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> => {
  const { cacheKey, useCache, headers, ...rest } = options || {};

  const fullCacheKey = cacheKey || (useCache ? `${method}:${url}` : '');

  if (useCache && fullCacheKey && cache.has(fullCacheKey)) {
    return cache.get(fullCacheKey) as T;
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...rest,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (useCache && fullCacheKey) {
    cache.set(fullCacheKey, data);
  }

  return data as T;
};

export const api = {
  get: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, 'GET', undefined, options),

  post: <T>(url: string, body: unknown, options?: RequestOptions) =>
    request<T>(url, 'POST', body, options),

  put: <T>(url: string, body: unknown, options?: RequestOptions) =>
    request<T>(url, 'PUT', body, options),

  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, 'DELETE', undefined, options),

  clearCache: () => cache.clear(),
  removeFromCache: (key: string) => cache.delete(key),
};
