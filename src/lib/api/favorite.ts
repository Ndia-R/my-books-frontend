import { customFetch, getCsrfToken } from '@/lib/api/fetch-client';
import type { FavoriteRequest } from '@/types';

// お気に入り追加
export const createFavorite = async (requestBody: FavoriteRequest) => {
  const endpoint = `/favorites`;
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await customFetch(endpoint, options);
};

// お気に入り削除（ID指定）
export const deleteFavorite = async (favoriteId: number) => {
  const endpoint = `/favorites/${favoriteId}`;
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  };
  await customFetch(endpoint, options);
};

// お気に入り削除（書籍ID指定）
export const deleteFavoriteByBookId = async (bookId: string) => {
  const endpoint = `/favorites/books/${bookId}`;
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  };
  await customFetch(endpoint, options);
};
