import { fetchJsonWithAuth } from '@/lib/auth';
import { fetchJson } from '@/lib/data';
import { CheckUsernameExists, ProfileCounts, User } from '@/types';

export const getCurrentUser = async () => {
  try {
    const url = `/me`;
    const user = await fetchJsonWithAuth<User>(url);
    return user;
  } catch {
    return null;
  }
};

export const getProfileCounts = async () => {
  try {
    const url = `/me/profile-counts`;
    const profieleCounts = await fetchJsonWithAuth<ProfileCounts>(url);
    return profieleCounts;
  } catch (err) {
    throw new Error('ユーザーのプロフィール情報の読み込みが失敗しました。' + err);
  }
};

export const checkUsernameExists = async (name: string) => {
  try {
    const url = `/users/exists?name=${name}`;
    const data = await fetchJson<CheckUsernameExists>(url);
    return data.exists;
  } catch {
    return false; // エラーの場合「存在しない」とするのはどうかと思うけどいったんfalse
  }
};
