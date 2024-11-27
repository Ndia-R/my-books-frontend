export interface Book {
  id: string;
  title: string;
  description: string;
  genreIds: number[];
  authors: string[];
  publisher: string;
  publishedDate: string;
  price: number;
  pageCount: number;
  isbn: string;
  imageUrl: string;
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

export interface UserInfo {
  id: string;
  account: string;
  avatarUrl: string;
}

export interface Review {
  id: number;
  bookId: string;
  comment: string;
  rating: number;
  updatedAt: string;
  user: UserInfo;
}
