import {
  BookCopyIcon,
  BookmarkIcon,
  HeartIcon,
  MessageSquareIcon,
  SettingsIcon,
} from 'lucide-react';

export const LOGO_TITLE = 'My Books';

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

export const BOOKS_API_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
export const IMAGE_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/images`;

export const BOOK_IMAGE_BASE_URL = `${IMAGE_BASE_URL}/my-books`;
export const AVATAR_IMAGE_BASE_URL = `${IMAGE_BASE_URL}/avatars`;

export const AVATAR_PATHS = [...Array(41)].map(
  (_, index) => `/avatar${String(index).padStart(2, '0')}.png`
);

export const FETCH_BOOKS_MAX_RESULTS = 20;
export const FETCH_REVIEWS_MAX_RESULTS = 3;

export const FETCH_FAVORITES_MAX_RESULTS = 5;
export const FETCH_MY_REVIEWS_MAX_RESULTS = 5;
export const FETCH_BOOKMARKS_MAX_RESULTS = 5;
