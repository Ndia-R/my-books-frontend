import { CACHE_TIME } from '@/shared/config/cache-time';
import { userQueryKeys } from '@/entities/user/model/query-keys';
import {
  getUserBookmarks,
  getUserFavorites,
  getUserProfileCounts,
  getUserReviews,
} from '@/entities/user/api/users';
import type { BookmarkPage } from '@/entities/bookmark/model/types';
import type { FavoritePage } from '@/entities/favorite/model/types';
import type { ReviewPage } from '@/entities/review/model/types';
import { useQueryClient } from '@tanstack/react-query';

export function usePrefetchUser() {
  const queryClient = useQueryClient();

  // ユーザーのお気に入り一覧
  const prefetchUserFavorites = async (page: number) => {
    await queryClient.prefetchQuery({
      queryKey: userQueryKeys.getUserFavorites(page),
      queryFn: () => getUserFavorites(page),
      staleTime: CACHE_TIME.MEDIUM,
    });
  };
  const prefetchUserFavoritesInfinite = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: userQueryKeys.getUserFavoritesInfinite(),
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
      queryKey: userQueryKeys.getUserBookmarks(page),
      queryFn: () => getUserBookmarks(page),
      staleTime: CACHE_TIME.MEDIUM,
    });
  };
  const prefetchUserBookmarksInfinite = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: userQueryKeys.getUserBookmarksInfinite(),
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
      queryKey: userQueryKeys.getUserReviews(page),
      queryFn: () => getUserReviews(page),
      staleTime: CACHE_TIME.MEDIUM,
    });
  };
  const prefetchUserReviewsInfinite = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: userQueryKeys.getUserReviewsInfinite(),
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
      queryKey: userQueryKeys.getUserProfileCounts(),
      queryFn: () => getUserProfileCounts(),
      staleTime: CACHE_TIME.MEDIUM,
    });
  };

  return {
    prefetchUserFavorites,
    prefetchUserFavoritesInfinite,
    prefetchUserBookmarks,
    prefetchUserBookmarksInfinite,
    prefetchUserReviews,
    prefetchUserReviewsInfinite,
    prefetchUserProfile,
  };
}
