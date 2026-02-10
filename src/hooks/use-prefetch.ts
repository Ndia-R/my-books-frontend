import { CACHE_TIME } from '@/constants/cache-time';
import { queryKeys } from '@/constants/query-keys';
import {
  getBookChapterPageContent,
  getBookChapterPagePreview,
  getBookDetails,
  getBookFavoriteStats,
  getBookToc,
  searchBooksByGenre,
  searchBooksByTitleKeyword,
} from '@/lib/api/books';
import {
  getUserBookmarks,
  getUserBookmarksByBookId,
  getUserFavorites,
  getUserProfileCounts,
  getUserReviews,
} from '@/lib/api/users';
import type { BookmarkPage } from '@/types/bookmark';
import type { FavoritePage } from '@/types/favorite';
import type { ReviewPage } from '@/types/review';
import { useQueryClient } from '@tanstack/react-query';

export default function usePrefetch() {
  const queryClient = useQueryClient();

  // タイトル検索
  const prefetchBookSearch = async (q: string, page: number = 1) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.searchBooksByTitleKeyword(q, page),
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
      queryKey: queryKeys.searchBooksByGenre(genreIds, condition, page),
      queryFn: () => searchBooksByGenre(genreIds, condition, page),
      staleTime: CACHE_TIME.SHORT,
    });
  };

  // 書籍の詳細
  const prefetchBookDetail = async (bookId: string) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.getBookDetails(bookId),
        queryFn: () => getBookDetails(bookId),
        staleTime: CACHE_TIME.LONG,
      }),

      queryClient.prefetchQuery({
        queryKey: queryKeys.getBookFavoriteStats(bookId),
        queryFn: () => getBookFavoriteStats(bookId),
        staleTime: CACHE_TIME.SHORT,
      }),
    ]);
  };

  // 書籍の目次
  const prefetchBookToc = async (bookId: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.getBookToc(bookId),
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
        queryKey: queryKeys.getBookToc(bookId),
        queryFn: () => getBookToc(bookId),
        staleTime: CACHE_TIME.FOREVER,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.getBookChapterPagePreview(
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
        queryKey: queryKeys.getBookToc(bookId),
        queryFn: () => getBookToc(bookId),
        staleTime: CACHE_TIME.FOREVER,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.getBookChapterPageContent(
          bookId,
          chapterNumber,
          pageNumber
        ),
        queryFn: () =>
          getBookChapterPageContent(bookId, chapterNumber, pageNumber),
        staleTime: CACHE_TIME.FOREVER,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.getUserBookmarksByBookId(bookId),
        queryFn: () => getUserBookmarksByBookId(bookId),
        staleTime: CACHE_TIME.MEDIUM,
      }),
    ]);
  };

  // ユーザーのお気に入り一覧
  const prefetchUserFavorites = async (page: number) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.getUserFavorites(page),
      queryFn: () => getUserFavorites(page),
      staleTime: CACHE_TIME.MEDIUM,
    });
  };
  const prefetchUserFavoritesInfinite = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: queryKeys.getUserFavoritesInfinite(),
      queryFn: ({ pageParam }) => getUserFavorites(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: FavoritePage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
      staleTime: CACHE_TIME.MEDIUM,
      gcTime: CACHE_TIME.MEDIUM,
    });
  };

  // ユーザーのブックマーク一覧
  const prefetchUserBookmarks = async (page: number) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.getUserBookmarks(page),
      queryFn: () => getUserBookmarks(page),
      staleTime: CACHE_TIME.MEDIUM,
    });
  };
  const prefetchUserBookmarksInfinite = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: queryKeys.getUserBookmarksInfinite(),
      queryFn: ({ pageParam }) => getUserBookmarks(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: BookmarkPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
      staleTime: CACHE_TIME.MEDIUM,
      gcTime: CACHE_TIME.MEDIUM,
    });
  };

  // ユーザーのレビュー一覧
  const prefetchUserReviews = async (page: number) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.getUserReviews(page),
      queryFn: () => getUserReviews(page),
      staleTime: CACHE_TIME.MEDIUM,
    });
  };
  const prefetchUserReviewsInfinite = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: queryKeys.getUserReviewsInfinite(),
      queryFn: ({ pageParam }) => getUserReviews(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ReviewPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
      staleTime: CACHE_TIME.MEDIUM,
      gcTime: CACHE_TIME.MEDIUM,
    });
  };

  // ユーザーのプロフィール
  const prefetchUserProfile = async () => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.getUserProfileCounts(),
      queryFn: () => getUserProfileCounts(),
      staleTime: CACHE_TIME.MEDIUM,
    });
  };

  return {
    prefetchBookSearch,
    prefetchBookDiscover,
    prefetchBookDetail,
    prefetchBookToc,
    prefetchBookReadPreview,
    prefetchBookReadContent,
    prefetchUserFavorites,
    prefetchUserFavoritesInfinite,
    prefetchUserBookmarks,
    prefetchUserBookmarksInfinite,
    prefetchUserReviews,
    prefetchUserReviewsInfinite,
    prefetchUserProfile,
  };
}
