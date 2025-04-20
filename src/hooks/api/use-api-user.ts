import { useAuth } from '@/providers/auth-provider';
import {
  ChangeEmail,
  ChangePassword,
  ProfileCounts,
  UpdateCurrentUser,
  User,
} from '@/types';

export const useApiUser = () => {
  const { fetchApiWithAuth } = useAuth();

  const getCurrentUser = async () => {
    try {
      const endpoint = `/me`;
      const response = await fetchApiWithAuth<User>(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('ユーザー情報の読み込みが失敗しました。');
    }
  };

  const getProfileCounts = async () => {
    try {
      const endpoint = `/me/profile-counts`;
      const response = await fetchApiWithAuth<ProfileCounts>(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('ユーザーのプロフィール情報の読み込みが失敗しました。');
    }
  };

  const updateCurrentUser = async (requestBody: UpdateCurrentUser) => {
    try {
      const endpoint = `/me`;
      const options: RequestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      };
      await fetchApiWithAuth(endpoint, options);
    } catch (error) {
      console.error(error);
      throw new Error('ユーザー情報の更新に失敗しました。');
    }
  };

  const changePassword = async (requestBody: ChangePassword) => {
    try {
      const endpoint = `/me/password`;
      const options: RequestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      };
      await fetchApiWithAuth(endpoint, options);
    } catch (error) {
      console.error(error);
      throw new Error('パスワードの更新に失敗しました。');
    }
  };

  const changeEmail = async (requestBody: ChangeEmail) => {
    try {
      const endpoint = `/me/email`;
      const options: RequestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      };
      await fetchApiWithAuth(endpoint, options);
    } catch (error) {
      console.error(error);
      throw new Error('メールアドレスの更新に失敗しました。');
    }
  };

  return {
    getCurrentUser,
    getProfileCounts,
    updateCurrentUser,
    changePassword,
    changeEmail,
  };
};
