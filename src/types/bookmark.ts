import { Book } from '@/types/book';

export interface Bookmark {
  id: number;
  userId: number;
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
  note: string;
  updatedAt: string;
  book: Book;
}

export interface BookmarkPage {
  page: number;
  totalPages: number;
  totalItems: number;
  bookmarks: Bookmark[];
}

export interface BookmarkRequest {
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
  note: string;
}
