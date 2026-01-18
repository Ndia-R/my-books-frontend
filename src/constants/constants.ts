import { BookSortOrder, ReviewSortOrder } from '@/constants/sort-types';

export const TITLE_LOGO = 'My Books';
export const APP_TITLE = 'My Books';

// フロントエンドのルーティングベースパス
// vite.config.tsのbaseと、React Routerのbasenameに対応
// 末尾スラッシュなしで定義し、必要に応じて使用箇所で追加する
export const APP_BASE_PATH = import.meta.env.VITE_APP_BASE_PATH;

export const BOOKS_API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/my-books`;
export const BFF_API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/bff/auth`;

export const IMAGE_BASE_URL = `https://vsv-crystal.skygroup.local/assets/images`;
export const BOOK_IMAGE_BASE_URL = `${IMAGE_BASE_URL}/my-books`;
export const AVATAR_IMAGE_BASE_URL = `${IMAGE_BASE_URL}/avatars`;

// アバター画像
export const AVATAR_PATHS = Array.from(
  { length: 41 },
  (_, index) => `/avatar${String(index).padStart(2, '0')}.png`
);
export const DEFAULT_AVATAR_PATH = AVATAR_PATHS[0];

// 書籍検索系
export const DEFAULT_BOOKS_SIZE = 20;
export const DEFAULT_BOOKS_SORT = BookSortOrder.PopularityDesc;

// 書籍レビュー表示
export const DEFAULT_REVIEWS_SIZE = 3;
export const DEFAULT_REVIEWS_SORT = ReviewSortOrder.UpdatedAtDesc;

// マイページ系コンテンツ（レビュー、お気に入り、ブックマーク）の共通設定
export const DEFAULT_MY_PAGE_SIZE = 5;
export const DEFAULT_MY_PAGE_SORT = ReviewSortOrder.UpdatedAtDesc;

// Toastでエラー通知時の表示時間（ミリ秒）
export const TOAST_ERROR_DURATION = 5000;
