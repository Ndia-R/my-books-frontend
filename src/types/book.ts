import { Genre } from '@/types/genre';

export interface Book {
  id: string;
  title: string;
  description: string;
  genreIds: number[];
  authors: string[];
  publicationDate: string;
  imagePath: string;
  reviewCount: number;
  averageRating: number;
}

export interface BookPage {
  page: number;
  totalPages: number;
  totalItems: number;
  books: Book[];
}

export interface BookDetails {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  authors: string[];
  publisher: string;
  publicationDate: string;
  price: number;
  pageCount: number;
  isbn: string;
  imagePath: string;
  reviewCount: number;
  averageRating: number;
}
