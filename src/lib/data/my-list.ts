import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { fetchJsonWithAuth } from '@/lib/auth';
import { PaginatedBook } from '@/types';

export const getMyLists = async (page: number = 0) => {
  try {
    const url = `/my-lists?&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = await fetchJsonWithAuth<PaginatedBook>(url);
    return paginatedBook;
  } catch {
    throw new Error('マイリスト一覧の読み込みが失敗しました。');
  }
};
