import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { customFetch } from '@/lib/api/fetch-client';
import {
  BookContentPage,
  BookDetails,
  BookPage,
  BookTableOfContents,
} from '@/types';

export const getBookDetailsById = async (bookId: string) => {
  try {
    const endpoint = `/books/${bookId}`;
    const response = await customFetch<BookDetails>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('書籍情報の読み込みが失敗しました。');
  }
};

export const getBookPageByQuery = async (q: string, page: number = 0) => {
  try {
    const basePage = page > 0 ? page - 1 : 0;
    const endpoint = `/books/search`;
    const query = `?q=${q}&page=${basePage}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const response = await customFetch<BookPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('書籍検索が失敗しました。');
  }
};

export const getBookPageByGenreId = async (
  genreIdsQuery: string,
  conditionQuery: string,
  page: number = 0
) => {
  try {
    const basePage = page > 0 ? page - 1 : 0;
    const endpoint = `/books/discover`;
    const query = `?genreIds=${genreIdsQuery}&condition=${conditionQuery}&page=${basePage}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const response = await customFetch<BookPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ジャンル検索が失敗しました。');
  }
};

export const getNewBooks = async () => {
  try {
    const endpoint = `/books/new-books`;
    const response = await customFetch<BookPage>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ニューリリース一覧の読み込みが失敗しました。');
  }
};

export const getBookTableOfContents = async (bookId: string) => {
  try {
    const endpoint = `/books/${bookId}/table-of-contents`;
    const response = await customFetch<BookTableOfContents>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('書籍の目次の読み込みが失敗しました。');
  }
};

export const getBookContentPage = async (
  bookId: string,
  chapterNumber: number,
  pageNumber: number
) => {
  try {
    const endpoint = `/read/books/${bookId}/chapters/${chapterNumber}/pages/${pageNumber}`;
    const response = await customFetch<BookContentPage>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('書籍のページ情報の読み込みが失敗しました。');
  }
};
