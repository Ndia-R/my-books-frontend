import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import {
  clearAccessToken,
  getAccessToken,
  logout,
  refreshAccessToken,
  setAccessToken,
} from '@/lib/auth';

export const fetchJSON = async (url: string, options?: RequestInit) => {
  const res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. HTTP error! status: ${res.status}`
    );
  }
  return res.json();
};

export const fetchWithAuth = async (url: string, options?: RequestInit) => {
  let token = getAccessToken();
  if (!token) {
    throw new Error('No access token found');
  }

  let res = await fetchWithToken(url, token, options);

  if (res.status === 401) {
    try {
      token = await refreshAccessToken();
      setAccessToken(token);
      res = await fetchWithToken(url, token, options);
    } catch (error) {
      console.error('Failed to refresh access token', error);
      clearAccessToken();
      await logout();
      window.location.href = '/login';
      throw new Error('Failed to refresh access token');
    }
  }

  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}. HTTP error! status: ${res.status}`
    );
  }

  // レスポンスが空の場合は、res.json()を呼び出さない
  if (
    res.status !== 204 &&
    res.headers.get('content-type')?.includes('application/json')
  ) {
    return res.json();
  }

  return null;
};

const fetchWithToken = async (url: string, token: string, options?: RequestInit) => {
  return fetch(`${BOOKS_API_ENDPOINT}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
};
