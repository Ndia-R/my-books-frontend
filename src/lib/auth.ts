import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import {
  AccessTokenResponse,
  CustomError,
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from '@/types/auth';

const ACCESS_TOKEN_KEY = 'accessToken';
const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const setAccessToken = (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token);
const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const login = async ({ email, password }: LoginRequest) => {
  const url = '/login';
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  };

  const res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
  if (!res.ok) {
    const data = await res.json();
    console.error(`status:${data.status} message:${data.messages.join()}`);
    return false;
  }

  const loginResponse = (await res.json()) as LoginResponse;
  setAccessToken(loginResponse.accessToken);
  return true;
};

export const signup = async ({ username, email, password }: SignupRequest) => {
  const url = '/signup';
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  };

  const res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
  if (!res.ok) {
    const data = await res.json();
    console.error(`status:${data.status} message:${data.messages.join()}`);
    return false;
  }

  await login({ email, password });
  return true;
};

export const logout = async () => {
  const url = '/logout';
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
  };

  const res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
  if (!res.ok) {
    return false;
  }

  clearAccessToken();
  return true;
};

export const fetchWithAuth = async (url: string, options?: RequestInit) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error(`アクセストークンがありません。URL: ${url}`);
  }

  let res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      clearAccessToken();
      const error: CustomError = new Error(
        `リフレッシュトークンの有効期限が切れました。URL: ${url}`
      );
      error.code = 'REFRESH_TOKEN_EXPIRED';
      throw error;
    }

    setAccessToken(newToken);
    res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  if (!res.ok) {
    throw new Error(`失敗しました。URL: ${url} ステータス: ${res.status}`);
  }

  // JSONレスポンスがある場合のみデータを返却
  if (
    res.status !== 204 &&
    res.headers.get('content-type')?.includes('application/json')
  ) {
    return res.json();
  }

  // 空のレスポンスの場合
  return null;
};

export const refreshAccessToken = async () => {
  try {
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
    };
    const res = await fetch(`${BOOKS_API_ENDPOINT}/refresh-token`, options);
    const accessTokenResponse = (await res.json()) as AccessTokenResponse;
    return accessTokenResponse.accessToken;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const validateToken = async () => {
  try {
    const url = `/validate-token`;
    const options = { method: 'POST' };
    await fetchWithAuth(url, options);
    return true;
  } catch (e) {
    if ((e as CustomError).code) return null;
    return false;
  }
};
