import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { fetchJsonWithAuth } from '@/lib/auth';
import { Bookmark, BookmarkPage } from '@/types';

export const getBookmarkPage = async (page: number = 0) => {
  try {
    const url = `/me/bookmarks?&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const bookmarkPage = await fetchJsonWithAuth<BookmarkPage>(url);
    return bookmarkPage;
  } catch {
    throw new Error('ブックマーク一覧の読み込みが失敗しました。');
  }
};

export const getBookmarkById = async (bookId: string) => {
  try {
    const url = `/me/bookmarks/${bookId}`;
    const bookmark = await fetchJsonWithAuth<Bookmark>(url);
    return bookmark;
  } catch {
    throw new Error('ブックマークの読み込みが失敗しました。');
  }
};
