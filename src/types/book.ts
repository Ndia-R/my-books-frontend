export interface Book {
  id: string; // ID
  title: string; // タイトル
  description: string; // 概要
  genreIds: number[]; // ジャンルID
  authors: string[]; // 作者
  publisher: string; // 出版社
  publishedDate: string; // 出版日
  price: number; // 価格
  pageCount: number; // ページ数
  isbn: string; // ISBN
  imageUrl: string; // イメージ画像URL
}

export interface BookResponse {
  page: number;
  totalPages: number;
  totalItems: number;
  books: Book[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface FavoriteBook {
  id: string;
  bookId: string;
  userId: string;
  title: string;
  imageUrl: string;
  createdAt: Date;
}

export interface BookBrowsingHistory {
  id: string;
  bookId: string;
  userId: string;
  title: string;
  imageUrl: string;
  createdAt: Date;
  isFavorite: boolean;
}
