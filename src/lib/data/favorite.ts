import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { fetchJsonWithAuth } from '@/lib/auth';
import { Favorite, FavoriteCount, FavoritePage } from '@/types';

export const getFavorites = async (page: number = 0) => {
  try {
    const url = `/me/favorites?&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const favoritePage = await fetchJsonWithAuth<FavoritePage>(url);
    return favoritePage;
  } catch {
    throw new Error('お気に入り一覧の読み込みが失敗しました。');
  }
};

export const getFavoriteByBookId = async (bookId: string) => {
  try {
    const url = `/me/favorites/${bookId}`;
    const favorite = await fetchJsonWithAuth<Favorite>(url);
    return favorite;
  } catch {
    return null;
  }
};

export const getFavoriteCount = async (bookId: string) => {
  try {
    const url = `/books/${bookId}/favorites/count`;
    const favoriteCount = await fetchJsonWithAuth<FavoriteCount>(url);
    return favoriteCount;
  } catch {
    throw new Error('お気に入りカウントの読み込みが失敗しました。');
  }
};
