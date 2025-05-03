import { fetchApi } from '@/lib/api/fetch-api/api-client';
import { AccessToken, LoginRequest, SignupRequest } from '@/types';

export const login = async (requestBody: LoginRequest) => {
  try {
    const endpoint = `/login`;
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      credentials: 'include',
    };
    const response = await fetchApi<AccessToken>(endpoint, options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ログインに失敗しました。');
  }
};

export const signup = async (requestBody: SignupRequest) => {
  try {
    const endpoint = `/signup`;
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      credentials: 'include',
    };
    const response = await fetchApi<AccessToken>(endpoint, options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('サインアップに失敗しました。');
  }
};

export const logout = async () => {
  try {
    const endpoint = `/logout`;
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
    };
    await fetchApi(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('ログアウトに失敗しました。');
  }
};
