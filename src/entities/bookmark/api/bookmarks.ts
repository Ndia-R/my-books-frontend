import type {
  BookmarkPage,
  BookmarkRequest,
} from '@/entities/bookmark/model/types';
import { getCsrfToken } from '@/shared/api/csrf';
import { fetchBooksApi } from '@/shared/api/fetch';
import {
  DEFAULT_MY_PAGE_SIZE,
  DEFAULT_MY_PAGE_SORT,
} from '@/shared/config/constants';
import type { ReviewSortOrder } from '@/shared/config/sort-orders';
import { buildPath, buildQueryString } from '@/shared/lib/url-builder';

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

// 自分のブックマーク一覧
export const getUserBookmarks = async (
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/bookmarks`;
  const queryString = buildQueryString({ page, size, sort });
  const response = await fetchBooksApi<BookmarkPage>(path + queryString);
  return response.data;
};

// 自分の追加した特定の書籍のブックマーク
export const getUserBookmarksByBookId = async (
  bookId: string,
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/bookmarks`;
  const queryString = buildQueryString({ bookId, page, size, sort });
  const response = await fetchBooksApi<BookmarkPage>(path + queryString);
  return response.data;
};
