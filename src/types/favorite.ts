import { Book } from '@/types/book';

export type Favorite = {
  id: number;
  userId: number;

  createdAt: string;
  updatedAt: string;
  book: Book;
};

export type FavoritePage = {
  currentPage: number; // ページ番号は1ベース
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
  data: Favorite[];
};

export type FavoriteStats = {
  bookId: string;
  favoriteCount: number;
};

export type FavoriteRequest = {
  bookId: string;
};
