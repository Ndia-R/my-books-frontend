import { useApi } from '@/hooks/api/use-api';
import {
  ChangeEmail,
  ChangePassword,
  CheckUsernameExists,
  ProfileCounts,
  UpdateCurrentUser,
  User,
} from '@/types';

export const useApiUser = () => {
  const { fetcher, fetcherWithAuth, mutationWithAuth } = useApi();

  const getCurrentUser = async () => {
    try {
      const url = `/me`;
      const user = await fetcherWithAuth<User>(url);
      return user;
    } catch {
      return null;
    }
  };

  const getProfileCounts = async () => {
    try {
      const url = `/me/profile-counts`;
      const profieleCounts = await fetcherWithAuth<ProfileCounts>(url);
      return profieleCounts;
    } catch (err) {
      throw new Error('ユーザーのプロフィール情報の読み込みが失敗しました。' + err);
    }
  };

  const checkUsernameExists = async (name: string) => {
    try {
      const url = `/users/exists?name=${name}`;
      const data = await fetcher<CheckUsernameExists>(url);
      if (!data) return false;
      return data.exists;
    } catch {
      return false; // エラーの場合「存在しない」とするのはどうかと思うけどいったんfalse
    }
  };

  const updateCurrentUser = async (requestBody: UpdateCurrentUser) => {
    try {
      const url = `/me`;
      const options: RequestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      };
      await mutationWithAuth(url, options);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const changePassword = async (requestBody: ChangePassword) => {
    try {
      const url = `/me/password`;
      const options: RequestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      };
      await mutationWithAuth(url, options);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const changeEmail = async (requestBody: ChangeEmail) => {
    try {
      const url = `/me/email`;
      const options: RequestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      };
      await mutationWithAuth(url, options);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return {
    getCurrentUser,
    getProfileCounts,
    checkUsernameExists,
    updateCurrentUser,
    changePassword,
    changeEmail,
  };
};
