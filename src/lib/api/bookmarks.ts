import { customFetch } from '@/lib/api/fetch-client';
import { BookmarkRequest } from '@/types';

// ブックマーク追加
export const createBookmark = async (requestBody: BookmarkRequest) => {
  try {
    const endpoint = `/bookmarks`;
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('ブックマークの作成に失敗しました。');
  }
};

// ブックマーク更新
export const updateBookmark = async (
  bookmarkId: number,
  requestBody: BookmarkRequest
) => {
  try {
    const endpoint = `/bookmarks/${bookmarkId}`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('ブックマークの更新に失敗しました。');
  }
};

// ブックマーク削除
export const deleteBookmark = async (bookmarkId: number) => {
  try {
    const endpoint = `/bookmarks/${bookmarkId}`;
    const options: RequestInit = { method: 'DELETE' };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('ブックマークの削除に失敗しました。');
  }
};
