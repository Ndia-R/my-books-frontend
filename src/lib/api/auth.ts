import { customFetch } from '@/lib/api/fetch-client';
import { AccessToken, LoginRequest, SignupRequest } from '@/types';

// ログイン
export const login = async (requestBody: LoginRequest) => {
  const endpoint = `/login`;
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
    credentials: 'include',
  };
  const response = await customFetch<AccessToken>(endpoint, options);
  return response.data;
};

// サインアップ
export const signup = async (requestBody: SignupRequest) => {
  const endpoint = `/signup`;
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
    credentials: 'include',
  };
  const response = await customFetch<AccessToken>(endpoint, options);
  return response.data;
};

// ログアウト
export const logout = async () => {
  const endpoint = `/logout`;
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
  };
  await customFetch(endpoint, options);
};
