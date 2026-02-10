import type { Book } from '@/types/book';
import type { Page } from '@/types/pagination';

export type Favorite = {
  id: number;
  userId: number;

  createdAt: string;
  updatedAt: string;
  book: Book;
};

export type FavoritePage = Page<Favorite>;

export type FavoriteStats = {
  bookId: string;
  favoriteCount: number;
};

export type FavoriteRequest = {
  bookId: string;
};
