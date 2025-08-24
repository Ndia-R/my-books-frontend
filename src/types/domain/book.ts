import { Genre } from '@/types/domain/genre';
import { Page } from '@/types/infrastructure';

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
  popularity: number;
};

export type BookPage = Page<Book>;

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
  popularity: number;
};

export type BookChapter = {
  chapterNumber: number;
  chapterTitle: string;
  totalPages: number;
};

export type BookToc = {
  bookId: string;
  title: string;
  chapters: BookChapter[];
};

export type BookChapterPageContent = {
  bookId: string;
  chapterNumber: number;
  chapterTitle: string;
  pageNumber: number;
  totalPagesInChapter: number;
  content: string;
};
