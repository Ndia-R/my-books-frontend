import {
  FETCH_BOOKS_MAX_RESULTS,
  FETCH_REVIEWS_MAX_RESULTS,
} from '@/constants/constants';
import { customFetch } from '@/lib/api/fetch-client';
import {
  BookChapterPageContent,
  BookDetails,
  BookPage,
  BookTableOfContents,
  FavoriteCounts,
  ReviewCounts,
  ReviewPage,
} from '@/types';

// 最新の書籍リスト（１０冊分）
export const getLatestBooks = async () => {
  try {
    const endpoint = `/books/new-releases`;
    const response = await customFetch<BookPage>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ニューリリース一覧の読み込みが失敗しました。');
  }
};

// タイトル検索
export const searchBooksByTitleKeyword = async (
  q: string,
  page: number = 0
) => {
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

// ジャンル検索
export const searchBooksByGenre = async (
  genreIds: string,
  condition: string,
  page: number = 0
) => {
  try {
    const basePage = page > 0 ? page - 1 : 0;
    const endpoint = `/books/discover`;
    const query = `?genreIds=${genreIds}&condition=${condition}&page=${basePage}&maxResults=${FETCH_BOOKS_MAX_RESULTS}`;
    const response = await customFetch<BookPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ジャンル検索が失敗しました。');
  }
};

// 特定の書籍の詳細
export const getBookDetails = async (bookId: string) => {
  try {
    const endpoint = `/books/${bookId}`;
    const response = await customFetch<BookDetails>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('書籍情報の読み込みが失敗しました。');
  }
};

// 特定の書籍の詳細
export const getBookTableOfContents = async (bookId: string) => {
  try {
    const endpoint = `/books/${bookId}/toc`;
    const response = await customFetch<BookTableOfContents>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('書籍の目次の読み込みが失敗しました。');
  }
};

// 特定の書籍の閲覧ページ
export const getBookChapterPageContent = async (
  bookId: string,
  chapterNumber: number,
  pageNumber: number
) => {
  try {
    const endpoint = `/books/${bookId}/chapters/${chapterNumber}/pages/${pageNumber}`;
    const response = await customFetch<BookChapterPageContent>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('書籍のページ情報の読み込みが失敗しました。');
  }
};

// 特定の書籍のレビュー一覧
export const getBookReviews = async (bookId: string, page: number = 0) => {
  try {
    const basePage = page > 0 ? page - 1 : 0;
    const endpoint = `/books/${bookId}/reviews`;
    const query = `?page=${basePage}&maxResults=${FETCH_REVIEWS_MAX_RESULTS}`;
    const response = await customFetch<ReviewPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('レビュー一覧の読み込みが失敗しました。');
  }
};

// 特定の書籍のレビュー数
export const getBookReviewCounts = async (bookId: string) => {
  try {
    const endpoint = `/books/${bookId}/reviews/counts`;
    const response = await customFetch<ReviewCounts>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('レビュー数の読み込みが失敗しました。');
  }
};

// 特定の書籍のお気に入り数
export const getBookFavoriteCounts = async (bookId: string) => {
  try {
    const endpoint = `/books/${bookId}/favorites/counts`;
    const response = await customFetch<FavoriteCounts>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('お気に入り数の読み込みが失敗しました。');
  }
};
