import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { fetchJsonWithAuth } from '@/lib/auth';
import { fetchJson } from '@/lib/data';
import { FavoriteCount, FavoriteState, PaginatedBook } from '@/types';

export const getFavorites = async (page: number = 0) => {
  try {
    const url = `/favorites?&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = await fetchJsonWithAuth<PaginatedBook>(url);
    return paginatedBook;
  } catch {
    throw new Error('お気に入り一覧の読み込みが失敗しました。');
  }
};

export const getFavoriteState = async (bookId: string) => {
  if (!bookId) return false;

  try {
    const url = `/favorites/state/${bookId}`;
    const favoriteState = await fetchJsonWithAuth<FavoriteState>(url);
    if (!favoriteState) return false;
    return favoriteState.isFavorite;
  } catch {
    throw new Error('お気に入り情報の読み込みが失敗しました。');
  }
};

export const getFavoriteCount = async (bookId: string) => {
  if (!bookId) return 0;

  try {
    const url = `/favorites/count/${bookId}`;
    const favoriteCount = await fetchJson<FavoriteCount>(url);
    return favoriteCount.count;
  } catch {
    throw new Error('お気に入りカウントの読み込みが失敗しました。');
  }
};
