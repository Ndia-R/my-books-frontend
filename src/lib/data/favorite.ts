import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { fetchJsonWithAuth } from '@/lib/auth';
import { fetchJson } from '@/lib/data';
import { sleep } from '@/lib/util';
import { Favorite, FavoriteInfo, FavoritePage } from '@/types';

export const getFavoriteByBookId = async (bookId: string) => {
  try {
    const url = `/favorites/${bookId}`;
    const favorite = await fetchJsonWithAuth<Favorite>(url);
    return favorite;
  } catch {
    throw new Error('お気に入りの読み込みが失敗しました。');
  }
};

export const getFavoritePage = async (page: number = 0) => {
  try {
    const url = `/favorites?&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const favoritePage = await fetchJsonWithAuth<FavoritePage>(url);
    return favoritePage;
  } catch {
    throw new Error('お気に入り一覧の読み込みが失敗しました。');
  }
};

export const getFavoriteInfo = async (bookId: string, userId: number | undefined) => {
  await sleep(2000);
  try {
    const query = userId ? `?userId=${userId}` : '';
    const url = `/books/${bookId}/favorites/info${query}`;
    const favoriteInfo = await fetchJson<FavoriteInfo>(url);
    return favoriteInfo;
  } catch {
    throw new Error('お気に入り情報の読み込みが失敗しました。');
  }
};
