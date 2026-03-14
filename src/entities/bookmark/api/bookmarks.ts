import { fetchBooksApi } from '@/shared/api/fetch';
import { buildPath } from '@/shared/api/url-builder';
import { getCsrfToken } from '@/shared/lib/utils';
import type { BookmarkRequest } from '@/entities/bookmark/model/types';

// ブックマーク追加
export const createBookmark = async (requestBody: BookmarkRequest) => {
  const path = `/bookmarks`;
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

// ブックマーク更新
export const updateBookmark = async (
  bookmarkId: number,
  requestBody: BookmarkRequest
) => {
  const path = buildPath('/bookmarks/:bookmarkId', { bookmarkId });
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(path, options);
};

// ブックマーク削除
export const deleteBookmark = async (bookmarkId: number) => {
  const path = buildPath('/bookmarks/:bookmarkId', { bookmarkId });
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  };
  await fetchBooksApi(path, options);
};
