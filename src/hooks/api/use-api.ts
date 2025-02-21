import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import { useAuth } from '@/hooks/context/use-auth';

export const useApi = () => {
  const { accessToken, refreshAccessToken } = useAuth();

  const fetcher = async <T>(url: string, options: RequestInit = {}) => {
    const response = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
    if (!response.ok) {
      throw new Error(`失敗しました。URL: ${url} ステータス: ${response.status}`);
    }

    return response.json() as Promise<T>;
  };

  const fetcherWithAuth = async <T>(url: string, options: RequestInit = {}) => {
    let response = await fetch(`${BOOKS_API_ENDPOINT}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      await refreshAccessToken();
      response = await fetch(`${BOOKS_API_ENDPOINT}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    if (!response.ok) {
      throw new Error(`失敗しました。URL: ${url} ステータス: ${response.status}`);
    }

    return response.json() as Promise<T>;
  };

  const mutation = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
    if (!response.ok) {
      throw new Error(`失敗しました。URL: ${url} ステータス: ${response.status}`);
    }
  };

  const mutationWithAuth = async (url: string, options: RequestInit = {}) => {
    let response = await fetch(`${BOOKS_API_ENDPOINT}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      await refreshAccessToken();
      response = await fetch(`${BOOKS_API_ENDPOINT}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    if (!response.ok) {
      throw new Error(`失敗しました。URL: ${url} ステータス: ${response.status}`);
    }
  };

  return { fetcher, fetcherWithAuth, mutation, mutationWithAuth };
};
