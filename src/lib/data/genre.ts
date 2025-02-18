import { fetchJson } from '@/lib/data';
import { sleep } from '@/lib/util';
import { Genre } from '@/types';

export const getGenres = async () => {
  await sleep(2000);
  try {
    const url = `/genres`;
    const genres = await fetchJson<Genre[]>(url);
    return genres;
  } catch {
    throw new Error('ジャンル一覧の読み込みが失敗しました。');
  }
};
