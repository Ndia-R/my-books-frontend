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

export interface PaginatedBook {
  page: number;
  totalPages: number;
  totalItems: number;
  books: Book[];
}

export interface BookDetail {
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

  favoriteCount: number;
  myListCount: number;
  reviewCount: number;
  rating: number;
}
