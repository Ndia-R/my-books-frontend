import { Book } from '@/types/book';

export type Favorite = {
  userId: number;
  bookId: string;
  createdAt: string;
  updatedAt: string;
  book: Book;
};

export type FavoritePage = {
  page: number;
  totalPages: number;
  totalItems: number;
  favorites: Favorite[];
};

export type FavoriteCounts = {
  bookId: string;
  favoriteCount: number;
};

export type FavoriteRequest = {
  bookId: string;
};
