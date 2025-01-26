import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { fetchJsonWithAuth } from '@/lib/auth';
import { fetchJson } from '@/lib/data';
import { FavoriteInfo, PaginatedBook } from '@/types';

export const getFavoriteInfo = async (bookId: string) => {
  try {
    const url = `/favorites/${bookId}/info`;
    const favoriteInfo = await fetchJson<FavoriteInfo>(url);
    return favoriteInfo;
  } catch {
    throw new Error('お気に入り情報の読み込みが失敗しました。');
  }
};

export const getFavoriteInfoWithAuth = async (bookId: string) => {
  try {
    const url = `/favorites/${bookId}/info`;
    const favoriteInfo = await fetchJsonWithAuth<FavoriteInfo>(url);
    return favoriteInfo;
  } catch {
    throw new Error('お気に入り情報の読み込みが失敗しました。');
  }
};

export const getFavorites = async (page: number = 0) => {
  try {
    const url = `/favorites?&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = await fetchJsonWithAuth<PaginatedBook>(url);
    return paginatedBook;
  } catch {
    throw new Error('お気に入り一覧の読み込みが失敗しました。');
  }
};
