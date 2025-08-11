import { Book } from '@/types/domain/book';
import { Page } from '@/types/infrastructure';

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
