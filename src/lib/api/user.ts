import { customFetch } from '@/lib/api/fetch-client';
import {
  ChangeEmail,
  ChangePassword,
  ProfileCounts,
  UpdateCurrentUser,
  User,
} from '@/types';

export const getCurrentUser = async () => {
  try {
    const endpoint = `/me`;
    const response = await customFetch<User>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ユーザー情報の読み込みが失敗しました。');
  }
};

export const getProfileCounts = async () => {
  try {
    const endpoint = `/me/profile-counts`;
    const response = await customFetch<ProfileCounts>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ユーザーのプロフィール情報の読み込みが失敗しました。');
  }
};

export const updateCurrentUser = async (requestBody: UpdateCurrentUser) => {
  try {
    const endpoint = `/me`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('ユーザー情報の更新に失敗しました。');
  }
};

export const changePassword = async (requestBody: ChangePassword) => {
  try {
    const endpoint = `/me/password`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('パスワードの更新に失敗しました。');
  }
};

export const changeEmail = async (requestBody: ChangeEmail) => {
  try {
    const endpoint = `/me/email`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('メールアドレスの更新に失敗しました。');
  }
};
