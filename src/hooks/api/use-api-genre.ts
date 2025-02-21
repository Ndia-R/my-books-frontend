import { useApi } from '@/hooks/api/use-api';
import { sleep } from '@/lib/util';
import { Genre } from '@/types';

export const useApiGenre = () => {
  const { fetcher } = useApi();

  const getGenres = async () => {
    await sleep(2000);
    try {
      const url = `/genres`;
      const genres = await fetcher<Genre[]>(url);
      return genres;
    } catch {
      throw new Error('ジャンル一覧の読み込みが失敗しました。');
    }
  };

  return { getGenres };
};
