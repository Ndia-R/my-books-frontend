import { fetchApi } from '@/api/client';
import { Genre } from '@/types';

export const useApiGenre = () => {
  const getGenres = async () => {
    try {
      const endpoint = `/genres`;
      const response = await fetchApi<Genre[]>(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('ジャンル一覧の読み込みが失敗しました。');
    }
  };

  return { getGenres };
};
