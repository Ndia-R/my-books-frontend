import {
  DEFAULT_MY_PAGE_SIZE,
  DEFAULT_MY_PAGE_SORT,
} from '@/constants/constants';
import type { ReviewSortOrder } from '@/constants/sort-types';
import { fetchBooksApi } from '@/lib/api/fetch';
import { buildQueryString, getCsrfToken } from '@/lib/utils';
import type {
  BookmarkPage,
  FavoritePage,
  ReviewPage,
  UpdateUserProfile,
  UserProfile,
  UserProfileCounts,
} from '@/types';

// 自分のプロフィール情報
export const getUserProfile = async () => {
  const path = `/me/profile`;
  const response = await fetchBooksApi<UserProfile>(path);
  return response.data;
};

// 自分のレビュー、お気に入り、ブックマークの数
export const getUserProfileCounts = async () => {
  const path = `/me/profile-counts`;
  const response = await fetchBooksApi<UserProfileCounts>(path);
  return response.data;
};

// 自分のレビュー一覧
export const getUserReviews = async (
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/reviews`;
  const queryString = buildQueryString({ page, size, sort });
  const response = await fetchBooksApi<ReviewPage>(path + queryString);
  return response.data;
};

// 自分のお気に入り一覧
export const getUserFavorites = async (
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/favorites`;
  const queryString = buildQueryString({ page, size, sort });
  const response = await fetchBooksApi<FavoritePage>(path + queryString);
  return response.data;
};

// 自分のブックマーク一覧
export const getUserBookmarks = async (
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/bookmarks`;
  const queryString = buildQueryString({ page, size, sort });
  const response = await fetchBooksApi<BookmarkPage>(path + queryString);
  return response.data;
};

// 自分が投稿した特定の書籍のレビュー
export const getUserReviewsByBookId = async (
  bookId: string,
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/reviews`;
  const queryString = buildQueryString({ bookId, page, size, sort });
  const response = await fetchBooksApi<ReviewPage>(path + queryString);
  return response.data;
};

// 自分の追加した特定の書籍のお気に入り
export const getUserFavoritesByBookId = async (
  bookId: string,
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/favorites`;
  const queryString = buildQueryString({ bookId, page, size, sort });
  const response = await fetchBooksApi<FavoritePage>(path + queryString);
  return response.data;
};

// 自分の追加した特定の書籍のブックマーク
export const getUserBookmarksByBookId = async (
  bookId: string,
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/bookmarks`;
  const queryString = buildQueryString({ bookId, page, size, sort });
  const response = await fetchBooksApi<BookmarkPage>(path + queryString);
  return response.data;
};

// 自分のプロフィール情報を更新
export const updateUserProfile = async (requestBody: UpdateUserProfile) => {
  const path = `/me/profile`;
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(path, options);
};

// この書籍をユーザーがレビューしているかどうか
// （データの取得を試みてエラーなら未登録とする）
export const isReviewedByUser = async (bookId: string) => {
  try {
    const response = await getUserReviewsByBookId(bookId);
    return response.totalItems !== 0;
  } catch {
    return false;
  }
};

// この書籍をユーザーがお気に入り登録しているかどうか
// （データの取得を試みてエラーなら未登録とする）
export const isFavoritedByUser = async (bookId: string) => {
  try {
    const response = await getUserFavoritesByBookId(bookId);
    return response.totalItems !== 0;
  } catch {
    return false;
  }
};
