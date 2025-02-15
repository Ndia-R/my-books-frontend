import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { fetchJson } from '@/lib/data';
import { Book, BookPage } from '@/types';

export const getBookById = async (bookId: string) => {
  try {
    const url = `/books/${bookId}`;
    const book = await fetchJson<Book>(url);
    return book;
  } catch {
    throw new Error('書籍情報の読み込みが失敗しました。');
  }
};

export const getBookPageByQuery = async (q: string, page: number = 0) => {
  try {
    const url = `/books/search?q=${q}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const bookPage = await fetchJson<BookPage>(url);
    return bookPage;
  } catch {
    throw new Error('書籍検索が失敗しました。');
  }
};

export const getBookPageByGenreId = async (genreIdsQuery: string, page: number = 0) => {
  try {
    // 「|」はそのまま渡すとエラーになるので、URLエンコードする
    const encodedParams = genreIdsQuery.replace(/\|/g, encodeURIComponent('|'));

    const url = `/books/discover?genreId=${encodedParams}&page=${page}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const bookPage = await fetchJson<BookPage>(url);
    return bookPage;
  } catch {
    throw new Error('ジャンル検索が失敗しました。');
  }
};

export const getNewBooks = async () => {
  try {
    const url = `/books/new-books`;
    const books = await fetchJson<Book[]>(url);
    return books;
  } catch {
    throw new Error('ニューリリース一覧の読み込みが失敗しました。');
  }
};
