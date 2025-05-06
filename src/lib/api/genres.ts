import { customFetch } from '@/lib/api/fetch-client';
import { Genre } from '@/types';

// すべてのジャンル取得
export const getGenres = async () => {
  try {
    const endpoint = `/genres`;
    const response = await customFetch<Genre[]>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ジャンル一覧の読み込みが失敗しました。');
  }
};
