import { fetchBooksApi } from '@/lib/api/fetch';
import { buildPath } from '@/lib/url-builder';
import { getCsrfToken } from '@/lib/utils';
import type { FavoriteRequest } from '@/types/favorite';

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
