import { queryKeys } from '@/constants/query-keys';
import {
  getBookChapterPageContent,
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
} from '@/lib/api/user';
import type { BookmarkPage, FavoritePage, ReviewPage } from '@/types';
import { useQueryClient } from '@tanstack/react-query';

export default function usePrefetch() {
  const queryClient = useQueryClient();

  // タイトル検索
  const prefetchBookSearch = async (q: string, page: number = 1) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.searchBooksByTitleKeyword(q, page),
      queryFn: () => searchBooksByTitleKeyword(q, page),
      staleTime: 1000 * 60,
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
      staleTime: 1000 * 60,
    });
  };

  // 書籍の詳細
  const prefetchBookDetail = async (bookId: string) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.getBookDetails(bookId),
        queryFn: () => getBookDetails(bookId),
        staleTime: 1000 * 60,
      }),

      queryClient.prefetchQuery({
        queryKey: queryKeys.getBookFavoriteStats(bookId),
        queryFn: () => getBookFavoriteStats(bookId),
        staleTime: 1000 * 60,
      }),
    ]);
  };

  // 書籍の目次
  const prefetchBookToc = async (bookId: string) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.getBookToc(bookId),
      queryFn: () => getBookToc(bookId),
      staleTime: Infinity,
    });
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
        staleTime: Infinity,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.getBookChapterPageContent(
          bookId,
          chapterNumber,
          pageNumber
        ),
        queryFn: () =>
          getBookChapterPageContent(bookId, chapterNumber, pageNumber),
        staleTime: Infinity,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.getUserBookmarksByBookId(bookId),
        queryFn: () => getUserBookmarksByBookId(bookId),
        staleTime: 1000 * 60,
      }),
    ]);
  };

  // ユーザーのお気に入り一覧
  const prefetchUserFavorites = async (page: number) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.getUserFavorites(page),
      queryFn: () => getUserFavorites(page),
      staleTime: 1000 * 60,
    });
  };
  const prefetchUserFavoritesInfinite = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: queryKeys.getUserFavoritesInfinite(),
      queryFn: ({ pageParam }) => getUserFavorites(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: FavoritePage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
      staleTime: Infinity,
      gcTime: Infinity,
    });
  };

  // ユーザーのブックマーク一覧
  const prefetchUserBookmarks = async (page: number) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.getUserBookmarks(page),
      queryFn: () => getUserBookmarks(page),
      staleTime: 1000 * 60,
    });
  };
  const prefetchUserBookmarksInfinite = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: queryKeys.getUserBookmarksInfinite(),
      queryFn: ({ pageParam }) => getUserBookmarks(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: BookmarkPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
      staleTime: Infinity,
      gcTime: Infinity,
    });
  };

  // ユーザーのレビュー一覧
  const prefetchUserReviews = async (page: number) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.getUserReviews(page),
      queryFn: () => getUserReviews(page),
      staleTime: 1000 * 60,
    });
  };
  const prefetchUserReviewsInfinite = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: queryKeys.getUserReviewsInfinite(),
      queryFn: ({ pageParam }) => getUserReviews(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: ReviewPage) =>
        lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
      staleTime: Infinity,
      gcTime: Infinity,
    });
  };

  // ユーザーのプロフィール
  const prefetchUserProfile = async () => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.getUserProfileCounts(),
      queryFn: () => getUserProfileCounts(),
      staleTime: 1000 * 60,
    });
  };

  return {
    prefetchBookSearch,
    prefetchBookDiscover,
    prefetchBookDetail,
    prefetchBookToc,
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
