import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { fetchJson } from '@/lib/data';
import { Book, BookDetail, PaginatedBook } from '@/types';

export const getBookDetailById = async (bookId: string) => {
  try {
    const url = `/books/${bookId}`;
    const bookDetail = await fetchJson<BookDetail>(url);
    return bookDetail;
  } catch {
    throw new Error('書籍情報の読み込みが失敗しました。');
  }
};

export const getBooksByQuery = async (q: string, page: number = 0) => {
  try {
    const url = `/books/search?q=${q}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = await fetchJson<PaginatedBook>(url);
    return paginatedBook;
  } catch {
    throw new Error('書籍検索が失敗しました。');
  }
};

export const getBooksByGenreId = async (genreIdsQuery: string, page: number = 0) => {
  try {
    // 「|」はそのまま渡すとエラーになるので、URLエンコードする
    const encodedParams = genreIdsQuery.replace(/\|/g, encodeURIComponent('|'));

    const url = `/books/discover?genreId=${encodedParams}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const paginatedBook = await fetchJson<PaginatedBook>(url);
    return paginatedBook;
  } catch {
    throw new Error('ジャンル検索が失敗しました。');
  }
};

export const getNewReleases = async () => {
  try {
    const url = `/books/new-releases`;
    const books = await fetchJson<Book[]>(url);
    return books;
  } catch {
    throw new Error('ニューリリース一覧の読み込みが失敗しました。');
  }
};
