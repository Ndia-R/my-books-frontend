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

export interface BookPage {
  page: number;
  totalPages: number;
  totalItems: number;
  books: Book[];
}
