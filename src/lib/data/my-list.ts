import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { fetchJsonWithAuth } from '@/lib/auth';
import { fetchJson } from '@/lib/data';
import { MyListInfo, PaginatedBook } from '@/types';

export const getMyListInfo = async (bookId: string) => {
  try {
    const url = `/my-lists/${bookId}/info`;
    const myListInfo = await fetchJson<MyListInfo>(url);
    return myListInfo;
  } catch {
    throw new Error('マイリスト情報の読み込みが失敗しました。');
  }
};

export const getMyListInfoWithAuth = async (bookId: string) => {
  try {
    const url = `/my-lists/${bookId}/info`;
    const myListInfo = await fetchJsonWithAuth<MyListInfo>(url);
    return myListInfo;
  } catch {
    throw new Error('マイリスト情報の読み込みが失敗しました。');
  }
};

export const getMyLists = async (page: number = 0) => {
  try {
    const url = `/my-lists?&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = await fetchJsonWithAuth<PaginatedBook>(url);
    return paginatedBook;
  } catch {
    throw new Error('マイリスト一覧の読み込みが失敗しました。');
  }
};
