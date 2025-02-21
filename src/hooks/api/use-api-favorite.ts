import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { useApi } from '@/hooks/api/use-api';
import { sleep } from '@/lib/util';
import { Favorite, FavoriteInfo, FavoritePage, FavoriteRequest } from '@/types';

export const useApiFavorite = () => {
  const { fetcher, fetcherWithAuth, mutationWithAuth } = useApi();

  const getFavoriteByBookId = async (bookId: string) => {
    try {
      const url = `/favorites/${bookId}`;
      const favorite = await fetcherWithAuth<Favorite>(url);
      return favorite;
    } catch {
      throw new Error('お気に入りの読み込みが失敗しました。');
    }
  };

  const getFavoritePage = async (page: number = 0) => {
    try {
      const url = `/favorites?&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
      const favoritePage = await fetcherWithAuth<FavoritePage>(url);
      return favoritePage;
    } catch {
      throw new Error('お気に入り一覧の読み込みが失敗しました。');
    }
  };

  const getFavoriteInfo = async (bookId: string, userId: number | undefined) => {
    await sleep(2000);
    try {
      const query = userId ? `?userId=${userId}` : '';
      const url = `/books/${bookId}/favorites/info${query}`;
      const favoriteInfo = await fetcher<FavoriteInfo>(url);
      return favoriteInfo;
    } catch {
      throw new Error('お気に入り情報の読み込みが失敗しました。');
    }
  };

  const createFavorite = async (reqestBody: FavoriteRequest) => {
    try {
      const url = `/favorites`;
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqestBody),
      };
      await mutationWithAuth(url, options);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const deleteFavorite = async (bookId: string) => {
    try {
      const url = `/favorites/${bookId}`;
      const options: RequestInit = { method: 'DELETE' };
      await mutationWithAuth(url, options);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return {
    getFavoriteByBookId,
    getFavoritePage,
    getFavoriteInfo,
    createFavorite,
    deleteFavorite,
  };
};
