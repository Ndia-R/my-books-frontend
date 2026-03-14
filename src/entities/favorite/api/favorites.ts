import type {
  FavoritePage,
  FavoriteRequest,
} from '@/entities/favorite/model/types';
import { fetchBooksApi } from '@/shared/api/fetch';
import { buildPath, buildQueryString } from '@/shared/api/url-builder';
import {
  DEFAULT_MY_PAGE_SIZE,
  DEFAULT_MY_PAGE_SORT,
} from '@/shared/config/constants';
import type { ReviewSortOrder } from '@/shared/config/sort-orders';
import { getCsrfToken } from '@/shared/lib/utils';

// お気に入り追加
export const createFavorite = async (requestBody: FavoriteRequest) => {
  const path = `/favorites`;
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(path, options);
};

// お気に入り削除（ID指定）
export const deleteFavorite = async (favoriteId: number) => {
  const path = buildPath('/favorites/:favoriteId', { favoriteId });
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  };
  await fetchBooksApi(path, options);
};

// お気に入り削除（書籍ID指定）
export const deleteFavoriteByBookId = async (bookId: string) => {
  const path = buildPath('/favorites/books/:bookId', { bookId });
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  };
  await fetchBooksApi(path, options);
};

// 自分のお気に入り一覧
export const getUserFavorites = async (
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/favorites`;
  const queryString = buildQueryString({ page, size, sort });
  const response = await fetchBooksApi<FavoritePage>(path + queryString);
  return response.data;
};

// 自分の追加した特定の書籍のお気に入り
export const getUserFavoritesByBookId = async (
  bookId: string,
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/favorites`;
  const queryString = buildQueryString({ bookId, page, size, sort });
  const response = await fetchBooksApi<FavoritePage>(path + queryString);
  return response.data;
};

// この書籍をユーザーがお気に入り登録しているかどうか
// （データの取得を試みてエラーなら未登録とする）
export const isFavoritedByUser = async (bookId: string) => {
  try {
    const response = await getUserFavoritesByBookId(bookId);
    return response.totalItems !== 0;
  } catch (error) {
    console.error('お気に入り確認中にエラー:', error);
    return false;
  }
};
