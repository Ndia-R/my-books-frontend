import {
  getBookChapterPageContent,
  getBookChapterPagePreview,
  getBookDetails,
  getBookFavoriteStats,
  getBookToc,
  searchBooksByGenre,
  searchBooksByTitleKeyword,
} from '@/entities/book/api/books';
import { bookQueryKeys } from '@/entities/book/model/query-keys';
import { getUserBookmarksByBookId } from '@/entities/bookmark/api/bookmarks';
import { bookmarkQueryKeys } from '@/entities/bookmark/model/query-keys';

import { CACHE_TIME } from '@/shared/config/cache-time';
import { useQueryClient } from '@tanstack/react-query';

export function usePrefetchBook() {
  const queryClient = useQueryClient();

  // タイトル検索
  const prefetchBookSearch = async (q: string, page: number = 1) => {
    await queryClient.prefetchQuery({
      queryKey: bookQueryKeys.searchBooksByTitleKeyword(q, page),
      queryFn: () => searchBooksByTitleKeyword(q, page),
      staleTime: CACHE_TIME.SHORT,
    });
  };

  // ジャンル検索
  const prefetchBookDiscover = async (
    genreIds: string,
    condition: string = 'SINGLE',
    page: number = 1
  ) => {
    await queryClient.prefetchQuery({
      queryKey: bookQueryKeys.searchBooksByGenre(genreIds, condition, page),
      queryFn: () => searchBooksByGenre(genreIds, condition, page),
      staleTime: CACHE_TIME.SHORT,
    });
  };

  // 書籍の詳細
  const prefetchBookDetail = async (bookId: string) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: bookQueryKeys.getBookDetails(bookId),
        queryFn: () => getBookDetails(bookId),
        staleTime: CACHE_TIME.LONG,
      }),

      queryClient.prefetchQuery({
        queryKey: bookQueryKeys.getBookFavoriteStats(bookId),
        queryFn: () => getBookFavoriteStats(bookId),
        staleTime: CACHE_TIME.SHORT,
      }),
    ]);
  };

  // 書籍の目次
  const prefetchBookToc = async (bookId: string) => {
    await queryClient.prefetchQuery({
      queryKey: bookQueryKeys.getBookToc(bookId),
      queryFn: () => getBookToc(bookId),
      staleTime: CACHE_TIME.FOREVER,
    });
  };

  // 書籍の内容（試し読み）
  const prefetchBookReadPreview = async (
    bookId: string,
    chapterNumber: number = 1,
    pageNumber: number = 1
  ) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: bookQueryKeys.getBookToc(bookId),
        queryFn: () => getBookToc(bookId),
        staleTime: CACHE_TIME.FOREVER,
      }),
      queryClient.prefetchQuery({
        queryKey: bookQueryKeys.getBookChapterPagePreview(
          bookId,
          chapterNumber,
          pageNumber
        ),
        queryFn: () =>
          getBookChapterPagePreview(bookId, chapterNumber, pageNumber),
        staleTime: CACHE_TIME.FOREVER,
      }),
    ]);
  };

  // 書籍の内容
  const prefetchBookReadContent = async (
    bookId: string,
    chapterNumber: number = 1,
    pageNumber: number = 1
  ) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: bookQueryKeys.getBookToc(bookId),
        queryFn: () => getBookToc(bookId),
        staleTime: CACHE_TIME.FOREVER,
      }),
      queryClient.prefetchQuery({
        queryKey: bookQueryKeys.getBookChapterPageContent(
          bookId,
          chapterNumber,
          pageNumber
        ),
        queryFn: () =>
          getBookChapterPageContent(bookId, chapterNumber, pageNumber),
        staleTime: CACHE_TIME.FOREVER,
      }),
      queryClient.prefetchQuery({
        queryKey: bookmarkQueryKeys.getUserBookmarksByBookId(bookId),
        queryFn: () => getUserBookmarksByBookId(bookId),
        staleTime: CACHE_TIME.MEDIUM,
      }),
    ]);
  };

  return {
    prefetchBookSearch,
    prefetchBookDiscover,
    prefetchBookDetail,
    prefetchBookToc,
    prefetchBookReadPreview,
    prefetchBookReadContent,
  };
}
