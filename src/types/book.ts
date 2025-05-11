import { Genre } from '@/types/genre';

export type Book = {
  id: string;
  title: string;
  description: string;
  genreIds: number[];
  authors: string[];
  publicationDate: string;
  imagePath: string;
  reviewCount: number;
  averageRating: number;
};

export type BookPage = {
  page: number;
  totalPages: number;
  totalItems: number;
  books: Book[];
};

export type BookDetails = {
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
};

export type BookChapter = {
  chapterNumber: number;
  chapterTitle: string;
  pageNumbers: number[];
};

export type BookTableOfContents = {
  bookId: string;
  title: string;
  chapters: BookChapter[];
};

export type BookChapterPageContent = {
  bookId: string;
  chapterNumber: number;
  chapterTitle: string;
  pageNumber: number;
  content: string;
};
