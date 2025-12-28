import {
  DEFAULT_BOOKS_SIZE,
  DEFAULT_BOOKS_SORT,
  DEFAULT_REVIEWS_SIZE,
  DEFAULT_REVIEWS_SORT,
} from '@/constants/constants';
import { fetchBooksApi } from '@/lib/api/fetch';
import type {
  BookChapterPageContent,
  BookDetails,
  BookPage,
  BookToc,
  FavoriteStats,
  ReviewPage,
  ReviewStats,
} from '@/types';

// 最新の書籍リスト（１０冊分）
export const getBooksNewReleases = async () => {
  const endpoint = `/books/new-releases`;
  const response = await fetchBooksApi<BookPage>(endpoint);
  return response.data;
};

// タイトル検索
export const searchBooksByTitleKeyword = async (
  q: string,
  page: number = 1,
  size = DEFAULT_BOOKS_SIZE,
  sort = DEFAULT_BOOKS_SORT
) => {
  const endpoint = `/books/search`;
  const query = `?q=${q}&page=${page}&size=${size}&sort=${sort}`;
  const response = await fetchBooksApi<BookPage>(endpoint + query);
  return response.data;
};

// ジャンル検索
export const searchBooksByGenre = async (
  genreIds: string,
  condition: string,
  page: number = 1,
  size = DEFAULT_BOOKS_SIZE,
  sort = DEFAULT_BOOKS_SORT
) => {
  const endpoint = `/books/discover`;
  const query = `?genreIds=${genreIds}&condition=${condition}&page=${page}&size=${size}&sort=${sort}`;
  const response = await fetchBooksApi<BookPage>(endpoint + query);
  return response.data;
};

// 特定の書籍の詳細
export const getBookDetails = async (bookId: string) => {
  const endpoint = `/books/${bookId}`;
  const response = await fetchBooksApi<BookDetails>(endpoint);
  return response.data;
};

// 特定の書籍の目次
export const getBookToc = async (bookId: string) => {
  const endpoint = `/books/${bookId}/toc`;
  const response = await fetchBooksApi<BookToc>(endpoint);
  return response.data;
};

// 特定の書籍の閲覧ページ
export const getBookChapterPageContent = async (
  bookId: string,
  chapterNumber: number,
  pageNumber: number
) => {
  const endpoint = `/book-content/books/${bookId}/chapters/${chapterNumber}/pages/${pageNumber}`;
  const response = await fetchBooksApi<BookChapterPageContent>(endpoint);
  return response.data;
};

// 特定の書籍のレビュー一覧
export const getBookReviews = async (
  bookId: string,
  page: number = 1,
  size = DEFAULT_REVIEWS_SIZE,
  sort = DEFAULT_REVIEWS_SORT
) => {
  const endpoint = `/books/${bookId}/reviews`;
  const query = `?page=${page}&size=${size}&sort=${sort}`;
  const response = await fetchBooksApi<ReviewPage>(endpoint + query);
  return response.data;
};

// 特定の書籍のレビュー統計
export const getBookReviewStats = async (bookId: string) => {
  const endpoint = `/books/${bookId}/stats/reviews`;
  const response = await fetchBooksApi<ReviewStats>(endpoint);
  return response.data;
};

// 特定の書籍のお気に入り統計
export const getBookFavoriteStats = async (bookId: string) => {
  const endpoint = `/books/${bookId}/stats/favorites`;
  const response = await fetchBooksApi<FavoriteStats>(endpoint);
  return response.data;
};
