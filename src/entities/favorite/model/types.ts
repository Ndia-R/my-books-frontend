import type { Book } from '@/entities/book/model/types';
import type { Page } from '@/shared/api/pagination';

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
