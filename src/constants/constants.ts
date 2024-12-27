import { HeartIcon, ListIcon, SettingsIcon } from 'lucide-react';

// ロゴ
export const LOGO_TITLE = 'My Books';

// メニュー一覧
export const MENU_LIST = [
  { href: '/favorites', title: 'お気に入り', icon: HeartIcon },
  { href: '/my-list', title: 'マイリスト', icon: ListIcon },
  { href: '/settings', title: '設定', icon: SettingsIcon },
];

// API Endpoits
// export const BOOKS_API_ENDPOINT = 'http://vsv-emerald/my-books/api/v1';
export const BOOKS_API_ENDPOINT = 'https://localhost/my-books/api/v1';

// export const BOOKS_IMAGE_URL = 'http://vsv-emerald/images';
export const BOOKS_IMAGE_URL = 'https://localhost/images';
