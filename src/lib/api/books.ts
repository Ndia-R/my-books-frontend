import {
  DEFAULT_BOOKS_SIZE,
  DEFAULT_BOOKS_SORT,
  DEFAULT_REVIEWS_SIZE,
  DEFAULT_REVIEWS_SORT,
} from '@/constants/constants';
import type { BookSortOrder, ReviewSortOrder } from '@/constants/sort-orders';
import { fetchBooksApi } from '@/lib/api/fetch';
import { buildPath, buildQueryString } from '@/lib/utils';
import type {
  BookChapterPageContent,
  BookDetails,
  BookPage,
  BookToc,
  FavoriteStats,
  ReviewPage,
} from '@/types';

// 最新の書籍リスト（１０冊分）
export const getBooksNewReleases = async () => {
  const path = `/books/new-releases`;
  const response = await fetchBooksApi<BookPage>(path);
  return response.data;
};

// タイトル検索
export const searchBooksByTitleKeyword = async (
  q: string,
  page: number = 1,
  size: number = DEFAULT_BOOKS_SIZE,
  sort: BookSortOrder = DEFAULT_BOOKS_SORT
) => {
  const path = `/books/search`;
  const queryString = buildQueryString({ q, page, size, sort });
  const response = await fetchBooksApi<BookPage>(path + queryString);
  return response.data;
};

// ジャンル検索
export const searchBooksByGenre = async (
  genreIds: string,
  condition: string,
  page: number = 1,
  size: number = DEFAULT_BOOKS_SIZE,
  sort: BookSortOrder = DEFAULT_BOOKS_SORT
) => {
  const path = `/books/discover`;
  const queryString = buildQueryString({
    genreIds,
    condition,
    page,
    size,
    sort,
  });
  const response = await fetchBooksApi<BookPage>(path + queryString);
  return response.data;
};

// 特定の書籍の詳細
export const getBookDetails = async (bookId: string) => {
  const path = buildPath('/books/:bookId', { bookId });
  const response = await fetchBooksApi<BookDetails>(path);
  return response.data;
};

// 特定の書籍の目次
export const getBookToc = async (bookId: string) => {
  const path = buildPath('/books/:bookId/toc', { bookId });
  const response = await fetchBooksApi<BookToc>(path);
  return response.data;
};

// 特定の書籍の閲覧ページ（試し読み）
export const getBookChapterPagePreview = async (
  bookId: string,
  chapterNumber: number,
  pageNumber: number
) => {
  const path = buildPath(
    '/book-content/preview/books/:bookId/chapters/:chapterNumber/pages/:pageNumber',
    { bookId, chapterNumber, pageNumber }
  );
  const response = await fetchBooksApi<BookChapterPageContent>(path);
  return response.data;
};

// 特定の書籍の閲覧ページ
export const getBookChapterPageContent = async (
  bookId: string,
  chapterNumber: number,
  pageNumber: number
) => {
  const path = buildPath(
    '/book-content/books/:bookId/chapters/:chapterNumber/pages/:pageNumber',
    { bookId, chapterNumber, pageNumber }
  );
  const response = await fetchBooksApi<BookChapterPageContent>(path);
  return response.data;
};

// 特定の書籍のレビュー一覧
export const getBookReviews = async (
  bookId: string,
  page: number = 1,
  size: number = DEFAULT_REVIEWS_SIZE,
  sort: ReviewSortOrder = DEFAULT_REVIEWS_SORT
) => {
  const path = buildPath('/books/:bookId/reviews', { bookId });
  const queryString = buildQueryString({ page, size, sort });
  const response = await fetchBooksApi<ReviewPage>(path + queryString);
  return response.data;
};

// 特定の書籍のお気に入り統計
export const getBookFavoriteStats = async (bookId: string) => {
  const path = buildPath('/books/:bookId/stats/favorites', { bookId });
  const response = await fetchBooksApi<FavoriteStats>(path);
  return response.data;
};
