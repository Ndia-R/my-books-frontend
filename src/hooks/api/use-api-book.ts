import { fetchApi } from '@/api/client';
import { FETCH_BOOKS_MAX_RESULTS } from '@/constants/constants';
import { useAuth } from '@/providers/auth-provider';
import {
  BookContentPage,
  BookDetails,
  BookPage,
  BookTableOfContents,
} from '@/types';

export const useApiBook = () => {
  const { fetchApiWithAuth } = useAuth();

  const getBookDetailsById = async (bookId: string) => {
    try {
      const endpoint = `/books/${bookId}`;
      const response = await fetchApi<BookDetails>(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('書籍情報の読み込みが失敗しました。');
    }
  };

  const getBookPageByQuery = async (q: string, page: number = 0) => {
    try {
      const basePage = page > 0 ? page - 1 : 0;
      const endpoint = `/books/search`;
      const query = `?q=${q}&page=${basePage}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
      const response = await fetchApi<BookPage>(endpoint + query);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('書籍検索が失敗しました。');
    }
  };

  const getBookPageByGenreId = async (
    genreIdsQuery: string,
    conditionQuery: string,
    page: number = 0
  ) => {
    try {
      const basePage = page > 0 ? page - 1 : 0;
      const endpoint = `/books/discover`;
      const query = `?genreIds=${genreIdsQuery}&condition=${conditionQuery}&page=${basePage}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
      const response = await fetchApi<BookPage>(endpoint + query);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('ジャンル検索が失敗しました。');
    }
  };

  const getNewBooks = async () => {
    try {
      const endpoint = `/books/new-books`;
      const response = await fetchApi<BookPage>(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('ニューリリース一覧の読み込みが失敗しました。');
    }
  };

  const getBookTableOfContents = async (bookId: string) => {
    try {
      const endpoint = `/books/${bookId}/table-of-contents`;
      const response = await fetchApi<BookTableOfContents>(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('書籍の目次の読み込みが失敗しました。');
    }
  };

  const getBookContentPage = async (
    bookId: string,
    chapterNumber: number,
    pageNumber: number
  ) => {
    try {
      const endpoint = `/read/books/${bookId}/chapters/${chapterNumber}/pages/${pageNumber}`;
      const response = await fetchApiWithAuth<BookContentPage>(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('書籍のページ情報の読み込みが失敗しました。');
    }
  };

  return {
    getBookDetailsById,
    getBookPageByQuery,
    getBookPageByGenreId,
    getNewBooks,
    getBookTableOfContents,
    getBookContentPage,
  };
};
