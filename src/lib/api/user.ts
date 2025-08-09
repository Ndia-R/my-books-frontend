import {
  DEFAULT_MY_REVIEWS_SIZE,
  DEFAULT_MY_REVIEWS_SORT,
} from '@/constants/constants';
import { customFetch } from '@/lib/api/fetch-client';
import {
  BookmarkPage,
  FavoritePage,
  ReviewPage,
  UpdateUserEmail,
  UpdateUserPassword,
  UpdateUserProfile,
  UserProfile,
  UserProfileCounts,
} from '@/types';

// 自分のプロフィール情報
export const getUserProfile = async () => {
  try {
    const endpoint = `/me/profile`;
    const response = await customFetch<UserProfile>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ユーザープロフィール情報の読み込みが失敗しました。');
  }
};

// 自分のレビュー、お気に入り、ブックマークの数
export const getUserProfileCounts = async () => {
  try {
    const endpoint = `/me/profile-counts`;
    const response = await customFetch<UserProfileCounts>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ユーザーのプロフィール情報の読み込みが失敗しました。');
  }
};

// 自分のレビュー一覧
export const getUserReviews = async (
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  try {
    const endpoint = `/me/reviews`;
    const query = `?page=${page}&size=${size}&sort${sort}`;
    const response = await customFetch<ReviewPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ユーザーのレビュー一覧の読み込みが失敗しました。');
  }
};

// 自分のお気に入り一覧
export const getUserFavorites = async (
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  try {
    const endpoint = `/me/favorites`;
    const query = `?page=${page}&size=${size}&sort${sort}`;
    const response = await customFetch<FavoritePage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ユーザーのお気に入り一覧の読み込みが失敗しました。');
  }
};

// 自分のブックマーク一覧
export const getUserBookmarks = async (
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  try {
    const endpoint = `/me/bookmarks`;
    const query = `?page=${page}&size=${size}&sort${sort}`;
    const response = await customFetch<BookmarkPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ユーザーのブックマーク一覧の読み込みが失敗しました。');
  }
};

// 自分が投稿した特定の書籍のレビュー
export const getUserReviewsByBookId = async (
  bookId: string,
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  try {
    const endpoint = `/me/reviews`;
    const query = `?bookId=${bookId}&page=${page}&size=${size}&sort=${sort}`;
    const response = await customFetch<ReviewPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('レビューの読み込みが失敗しました。');
  }
};

// 自分の追加した特定の書籍のお気に入り
export const getUserFavoritesByBookId = async (
  bookId: string,
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  try {
    const endpoint = `/me/favorites`;
    const query = `?bookId=${bookId}&page=${page}&size=${size}&sort=${sort}`;
    const response = await customFetch<FavoritePage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('お気に入りの読み込みが失敗しました。');
  }
};

// 自分の追加した特定の書籍のブックマーク
export const getUserBookmarksByBookId = async (
  bookId: string,
  page: number = 1,
  size = DEFAULT_MY_REVIEWS_SIZE,
  sort = DEFAULT_MY_REVIEWS_SORT
) => {
  try {
    const endpoint = `/me/bookmarks`;
    const query = `?bookId=${bookId}&page=${page}&size=${size}&sort=${sort}`;
    const response = await customFetch<BookmarkPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('ブックマーク一覧の読み込みが失敗しました。');
  }
};

// 自分のプロフィール情報を更新
export const updateUserProfile = async (requestBody: UpdateUserProfile) => {
  try {
    const endpoint = `/me/profile`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('プロフィール情報の更新に失敗しました。');
  }
};

// 自分のメールアドレスを更新
export const updateUserEmail = async (requestBody: UpdateUserEmail) => {
  try {
    const endpoint = `/me/email`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('メールアドレスの更新に失敗しました。');
  }
};

// 自分のパスワードを更新
export const updateUserPassword = async (requestBody: UpdateUserPassword) => {
  try {
    const endpoint = `/me/password`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('パスワードの更新に失敗しました。');
  }
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
