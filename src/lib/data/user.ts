import { fetchWithAuth } from '@/lib/auth';
import { fetchJSON } from '@/lib/data';
import { CheckNameExists, ProfileCounts, User } from '@/types';

export const getCurrentUser = async () => {
  try {
    const url = `/me`;
    const user = await fetchWithAuth<User>(url);
    return user;
  } catch {
    throw new Error('ユーザー情報の読み込みが失敗しました。');
  }
};

export const getProfileCounts = async () => {
  try {
    const url = `/me/profile-counts`;
    const profieleCounts = await fetchWithAuth<ProfileCounts>(url);
    return profieleCounts;
  } catch {
    throw new Error('ユーザーのプロフィール情報の読み込みが失敗しました。');
  }
};

export const checkNameExists = async (name: string) => {
  try {
    const url = `/check-name-exists?name=${name}`;
    const data = await fetchJSON<CheckNameExists>(url);
    return data.exists;
  } catch {
    return false; // エラーの場合「存在しない」とするのはどうかと思うけどいったんfalse
  }
};
