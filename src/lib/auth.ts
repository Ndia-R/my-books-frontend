import { BOOKS_API_ENDPOINT } from '@/constants/constants';
import {
  AccessTokenResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from '@/types/auth';

const ACCESS_TOKEN_KEY = 'accessToken';
const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const setAccessToken = (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token);
const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const login = async ({ email, password }: LoginRequest) => {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  const res = await fetch(`${BOOKS_API_ENDPOINT}/login`, options);
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
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  };

  const res = await fetch(`${BOOKS_API_ENDPOINT}/signup`, options);
  if (!res.ok) {
    const data = await res.json();
    console.error(`status:${data.status} message:${data.messages.join()}`);
    return false;
  }

  await login({ email, password });
  return true;
};

export const logout = async () => {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
  };

  const res = await fetch(`${BOOKS_API_ENDPOINT}/logout`, options);
  if (!res.ok) {
    return false;
  }

  clearAccessToken();
  return true;
};

export const fetchWithAuth = async (url: string, options?: RequestInit) => {
  let token = getAccessToken();
  if (!token) {
    throw new Error('アクセストークンがありません。');
  }

  let res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    token = await refreshAccessToken();
    if (!token) {
      clearAccessToken();
      throw new Error('リフレッシュトークンの有効期限が切れました。');
    }
    setAccessToken(token);
    res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
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

export const refreshAccessToken = async () => {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
  };
  const res = await fetch(`${BOOKS_API_ENDPOINT}/refresh-token`, options);
  if (!res.ok) {
    return null;
  }

  const accessTokenResponse = (await res.json()) as AccessTokenResponse;
  return accessTokenResponse.accessToken;
};

export const validateToken = async () => {
  try {
    const url = `/validate-token`;
    const options = { method: 'POST' };
    await fetchWithAuth(url, options);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
