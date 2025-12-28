import {
  DEFAULT_MY_REVIEWS_SIZE,
  DEFAULT_MY_REVIEWS_SORT,
} from '@/constants/constants';
import { fetchBooksApi } from '@/lib/api/fetch';
import { getCsrfToken } from '@/lib/utils';
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
  const endpoint = `/me/profile`;
  const response = await fetchBooksApi<UserProfile>(endpoint);
  return response.data;
};

// 自分のレビュー、お気に入り、ブックマークの数
export const getUserProfileCounts = async () => {
  const endpoint = `/me/profile-counts`;
  const response = await fetchBooksApi<UserProfileCounts>(endpoint);
  return response.data;
};

// 自分のレビュー一覧
export const getUserReviews = async (
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  const endpoint = `/me/reviews`;
  const query = `?page=${page}&size=${size}&sort=${sort}`;
  const response = await fetchBooksApi<ReviewPage>(endpoint + query);
  return response.data;
};

// 自分のお気に入り一覧
export const getUserFavorites = async (
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  const endpoint = `/me/favorites`;
  const query = `?page=${page}&size=${size}&sort=${sort}`;
  const response = await fetchBooksApi<FavoritePage>(endpoint + query);
  return response.data;
};

// 自分のブックマーク一覧
export const getUserBookmarks = async (
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  const endpoint = `/me/bookmarks`;
  const query = `?page=${page}&size=${size}&sort=${sort}`;
  const response = await fetchBooksApi<BookmarkPage>(endpoint + query);
  return response.data;
};

// 自分が投稿した特定の書籍のレビュー
export const getUserReviewsByBookId = async (
  bookId: string,
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  const endpoint = `/me/reviews`;
  const query = `?bookId=${bookId}&page=${page}&size=${size}&sort=${sort}`;
  const response = await fetchBooksApi<ReviewPage>(endpoint + query);
  return response.data;
};

// 自分の追加した特定の書籍のお気に入り
export const getUserFavoritesByBookId = async (
  bookId: string,
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  const endpoint = `/me/favorites`;
  const query = `?bookId=${bookId}&page=${page}&size=${size}&sort=${sort}`;
  const response = await fetchBooksApi<FavoritePage>(endpoint + query);
  return response.data;
};

// 自分の追加した特定の書籍のブックマーク
export const getUserBookmarksByBookId = async (
  bookId: string,
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  const endpoint = `/me/bookmarks`;
  const query = `?bookId=${bookId}&page=${page}&size=${size}&sort=${sort}`;
  const response = await fetchBooksApi<BookmarkPage>(endpoint + query);
  return response.data;
};

// 自分のプロフィール情報を更新
export const updateUserProfile = async (requestBody: UpdateUserProfile) => {
  const endpoint = `/me/profile`;
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(endpoint, options);
};

// この書籍をユーザーがレビューしているかどうか
// （データの取得を試みてエラーなら未登録とする）
export const isReviewedByUser = async (bookId: string) => {
  try {
    const response = await getUserReviewsByBookId(bookId);
    return response.totalItems != 0 ? true : false;
  } catch {
    return false;
  }
};

// この書籍をユーザーがお気に入り登録しているかどうか
// （データの取得を試みてエラーなら未登録とする）
export const isFavoritedByUser = async (bookId: string) => {
  try {
    const response = await getUserFavoritesByBookId(bookId);
    return response.totalItems != 0 ? true : false;
  } catch {
    return false;
  }
};
