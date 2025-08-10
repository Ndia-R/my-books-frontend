import { customFetch } from '@/lib/api/fetch-client';
import { BookmarkRequest } from '@/types';

// ブックマーク追加
export const createBookmark = async (requestBody: BookmarkRequest) => {
  const endpoint = `/bookmarks`;
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  await customFetch(endpoint, options);
};

// ブックマーク更新
export const updateBookmark = async (
  bookmarkId: number,
  requestBody: BookmarkRequest
) => {
  const endpoint = `/bookmarks/${bookmarkId}`;
  const options: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  await customFetch(endpoint, options);
};

// ブックマーク削除
export const deleteBookmark = async (bookmarkId: number) => {
  const endpoint = `/bookmarks/${bookmarkId}`;
  const options: RequestInit = { method: 'DELETE' };
  await customFetch(endpoint, options);
};
