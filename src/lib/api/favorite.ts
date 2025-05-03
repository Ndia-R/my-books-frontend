import { FETCH_FAVORITES_MAX_RESULTS } from '@/constants/constants';
import { fetchApi } from '@/lib/api/fetch-api/api-client';
import { Favorite, FavoriteInfo, FavoritePage, FavoriteRequest } from '@/types';

export const getFavoriteByBookId = async (bookId: string) => {
  try {
    const endpoint = `/favorites/${bookId}`;
    const response = await fetchApi<Favorite>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('お気に入りの読み込みが失敗しました。');
  }
};

export const getFavoritePage = async (page: number = 0) => {
  try {
    const basePage = page > 0 ? page - 1 : 0;
    const endpoint = `/favorites`;
    const query = `?page=${basePage}&maxResults=${FETCH_FAVORITES_MAX_RESULTS}`;
    const response = await fetchApi<FavoritePage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('お気に入り一覧の読み込みが失敗しました。');
  }
};

export const getFavoriteInfo = async (
  bookId: string,
  userId: number | undefined
) => {
  try {
    const endpoint = `/books/${bookId}/favorites/info`;
    const query = userId ? `?userId=${userId}` : '';
    const response = await fetchApi<FavoriteInfo>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('お気に入り情報の読み込みが失敗しました。');
  }
};

export const createFavorite = async (requestBody: FavoriteRequest) => {
  try {
    const endpoint = `/favorites`;
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await fetchApi(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('お気に入りの作成に失敗しました。');
  }
};

export const deleteFavorite = async (bookId: string) => {
  try {
    const endpoint = `/favorites/${bookId}`;
    const options: RequestInit = { method: 'DELETE' };
    await fetchApi(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('お気に入りの削除に失敗しました。');
  }
};
