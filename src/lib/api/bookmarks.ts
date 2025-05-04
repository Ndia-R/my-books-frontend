import { FETCH_BOOKMARKS_MAX_RESULTS } from '@/constants/constants';
import { customFetch } from '@/lib/api/fetch-client';
import { Bookmark, BookmarkPage, BookmarkRequest } from '@/types';

export const getBookmarkByBookId = async (bookId: string) => {
  try {
    const endpoint = `/bookmarks/${bookId}`;
    const response = await customFetch<Bookmark[]>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ブックマークの読み込みが失敗しました。');
  }
};

export const getBookmarkPage = async (page: number = 0) => {
  try {
    const basePage = page > 0 ? page - 1 : 0;
    const endpoint = `/bookmarks`;
    const query = `?page=${basePage}&maxResults=${FETCH_BOOKMARKS_MAX_RESULTS}`;
    const response = await customFetch<BookmarkPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ブックマーク一覧の読み込みが失敗しました。');
  }
};

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

export const updateBookmark = async (
  id: number,
  requestBody: BookmarkRequest
) => {
  try {
    const endpoint = `/bookmarks/${id}`;
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

export const deleteBookmark = async (id: number) => {
  try {
    const endpoint = `/bookmarks/${id}`;
    const options: RequestInit = { method: 'DELETE' };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('ブックマークの削除に失敗しました。');
  }
};
