import {
  BookCopyIcon,
  BookmarkIcon,
  HeartIcon,
  MessageSquareIcon,
  SettingsIcon,
} from 'lucide-react';

// ロゴ
export const LOGO_TITLE = 'My Books';

// メニュー一覧
export const MENU_LIST = [
  {
    href: '/discover?genreIds=1&condition=SINGLE',
    title: 'ジャンル',
    icon: BookCopyIcon,
  },
  { href: '/favorites', title: 'お気に入り', icon: HeartIcon },
  { href: '/bookmarks', title: 'ブックマーク', icon: BookmarkIcon },
  { href: '/my-reviews', title: 'マイレビュー', icon: MessageSquareIcon },
  { href: '/settings/profile', title: '設定', icon: SettingsIcon },
];

// API Endpoits
// export const BOOKS_API_ENDPOINT = 'https://vsv-emerald.skygroup.local/api/v1';
export const BOOKS_API_ENDPOINT = 'https://localhost/api/v1';

// export const AVATAR_BASE_URL = 'https://vsv-emerald.skygroup.local/images/avatars';
export const AVATAR_BASE_URL = 'https://localhost/images/avatars';
export const AVATAR_URLS = [...Array(41)].map(
  (_, index) => `${AVATAR_BASE_URL}/avatar${String(index).padStart(2, '0')}.png`
);

export const FETCH_BOOKS_MAX_RESULTS = 20;
export const FETCH_REVIEWS_MAX_RESULTS = 3;

export const FETCH_FAVORITES_MAX_RESULTS = 5;
export const FETCH_MY_REVIEWS_MAX_RESULTS = 5;
export const FETCH_BOOKMARKS_MAX_RESULTS = 5;
