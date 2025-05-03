import { fetchApi } from '@/lib/api/fetch-api/api-client';
import { Genre } from '@/types';

export const getGenres = async () => {
  try {
    const endpoint = `/genres`;
    const response = await fetchApi<Genre[]>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ジャンル一覧の読み込みが失敗しました。');
  }
};
