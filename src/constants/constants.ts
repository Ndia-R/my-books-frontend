import {
  BookmarkSortOrder,
  BookSortOrder,
  FavoriteSortOrder,
  ReviewSortOrder,
} from '@/constants/sort-types';

export const TITLE_LOGO = 'My Books';
export const APP_TITLE = 'My Books';

export const BOOKS_API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v2`;
export const IMAGE_BASE_URL = `${import.meta.env.VITE_BASE_URL}/images`;

export const BOOK_IMAGE_BASE_URL = `${IMAGE_BASE_URL}/my-books`;
export const AVATAR_IMAGE_BASE_URL = `${IMAGE_BASE_URL}/avatars`;

export const DEFAULT_BOOKS_SIZE = 20;
export const DEFAULT_REVIEWS_SIZE = 3;

export const DEFAULT_BOOKS_SORT = BookSortOrder.PopularityDesc;
export const DEFAULT_REVIEWS_SORT = ReviewSortOrder.UpdatedAtDesc;

export const DEFAULT_MY_REVIEWS_SIZE = 5;
export const DEFAULT_MY_FAVORITES_SIZE = 5;
export const DEFAULT_MY_BOOKMARKS_SIZE = 5;

export const DEFAULT_MY_REVIEWS_SORT = ReviewSortOrder.UpdatedAtDesc;
export const DEFAULT_MY_FAVORITES_SORT = FavoriteSortOrder.UpdatedAtDesc;
export const DEFAULT_MY_BOOKMARKS_SORT = BookmarkSortOrder.UpdatedAtDesc;

// セッション期限切れ用カスタムイベント
export const AUTH_SESSION_EXPIRED_EVENT = 'auth-session-expired';

// Toastでエラー通知時の表示時間（ミリ秒）
export const TOAST_ERROR_DURATION = 5000;
