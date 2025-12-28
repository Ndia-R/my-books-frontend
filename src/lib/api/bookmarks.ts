import { fetchBooksApi } from '@/lib/api/fetch';
import { getCsrfToken } from '@/lib/utils';
import type { BookmarkRequest } from '@/types';

// ブックマーク追加
export const createBookmark = async (requestBody: BookmarkRequest) => {
  const endpoint = `/bookmarks`;
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(endpoint, options);
};

// ブックマーク更新
export const updateBookmark = async (
  bookmarkId: number,
  requestBody: BookmarkRequest
) => {
  const endpoint = `/bookmarks/${bookmarkId}`;
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(endpoint, options);
};

// ブックマーク削除
export const deleteBookmark = async (bookmarkId: number) => {
  const endpoint = `/bookmarks/${bookmarkId}`;
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  };
  await fetchBooksApi(endpoint, options);
};
