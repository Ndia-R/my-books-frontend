import { fetchApi, handleApiError } from '@/api/client';
import { AccessToken, LoginRequest, SignupRequest, User } from '@/types';

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
    throw handleApiError(error);
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
    throw handleApiError(error);
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
    throw handleApiError(error);
  }
};

export const getAccessToken = async () => {
  try {
    const endpoint = `/refresh-token`;
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
    };
    const response = await fetchApi<AccessToken>(endpoint, options);
    return response.data.accessToken;
  } catch {
    return null;
  }
};

export const getUser = async (token: string | null) => {
  if (!token) return null;

  try {
    const endpoint = `/me`;
    const options: RequestInit = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await fetchApi<User>(endpoint, options);
    return response.data;
  } catch {
    return null;
  }
};
