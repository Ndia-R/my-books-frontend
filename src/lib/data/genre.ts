import { fetchJSON } from '@/lib/data';
import { Genre } from '@/types';

export const getGenres = async () => {
  try {
    const url = `/genres`;
    const genres = await fetchJSON<Genre[]>(url);
    return genres;
  } catch {
    throw new Error('ジャンル一覧の読み込みが失敗しました。');
  }
};
