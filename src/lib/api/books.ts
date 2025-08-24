import {
  DEFAULT_BOOKS_SIZE,
  DEFAULT_BOOKS_SORT,
  DEFAULT_REVIEWS_SIZE,
  DEFAULT_REVIEWS_SORT,
} from '@/constants/constants';
import { customFetch } from '@/lib/api/fetch-client';
import {
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
  const response = await customFetch<BookPage>(endpoint);
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
  const response = await customFetch<BookPage>(endpoint + query);
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
  const response = await customFetch<BookPage>(endpoint + query);
  return response.data;
};

// 特定の書籍の詳細
export const getBookDetails = async (bookId: string) => {
  const endpoint = `/books/${bookId}`;
  const response = await customFetch<BookDetails>(endpoint);
  return response.data;
};

// 特定の書籍の目次
export const getBookToc = async (bookId: string) => {
  const endpoint = `/books/${bookId}/toc`;
  const response = await customFetch<BookToc>(endpoint);
  return response.data;
};

// 特定の書籍の閲覧ページ
export const getBookChapterPageContent = async (
  bookId: string,
  chapterNumber: number,
  pageNumber: number
) => {
  const endpoint = `/content/books/${bookId}/chapters/${chapterNumber}/pages/${pageNumber}`;
  const response = await customFetch<BookChapterPageContent>(endpoint);
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
  const response = await customFetch<ReviewPage>(endpoint + query);
  return response.data;
};

// 特定の書籍のレビュー統計
export const getBookReviewStats = async (bookId: string) => {
  const endpoint = `/books/${bookId}/stats/reviews`;
  const response = await customFetch<ReviewStats>(endpoint);
  return response.data;
};

// 特定の書籍のお気に入り統計
export const getBookFavoriteStats = async (bookId: string) => {
  const endpoint = `/books/${bookId}/stats/favorites`;
  const response = await customFetch<FavoriteStats>(endpoint);
  return response.data;
};
