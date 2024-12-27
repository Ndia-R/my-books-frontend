import { fetchJSON, fetchWithAuth } from '@/lib/fetcher';
import { AccessTokenResponse, LoginResponse } from '@/types/auth';

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);

export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);

export const login = async (email: string, password: string) => {
  const url = `/login`;
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  };
  const loginResponse = (await fetchJSON(url, options)) as LoginResponse;
  setAccessToken(loginResponse.accessToken);
  return loginResponse;
};

export const refreshAccessToken = async () => {
  const url = `/refresh-token`;
  const options = { method: 'POST' };
  const accessTokenResponse = (await fetchWithAuth(url, options)) as AccessTokenResponse;
  return accessTokenResponse.accessToken;
};

export const validateToken = async () => {
  const url = `/validate-token`;
  const options = { method: 'POST' };
  try {
    await fetchWithAuth(url, options);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const logout = async () => {
  const url = `/logout`;
  const options = { method: 'POST' };
  await fetchWithAuth(url, options);
  clearAccessToken();
};
