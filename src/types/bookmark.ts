import { Book } from '@/types/book';
import { UseMutationResult } from '@tanstack/react-query';

export type Bookmark = {
  id: number;
  userId: number;
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
  note: string;
  chapterTitle: string;
  createdAt: string;
  updatedAt: string;
  book: Book;
};

export type BookmarkPage = {
  page: number;
  totalPages: number;
  totalItems: number;
  bookmarks: Bookmark[];
};

export type BookmarkRequest = {
  bookId: string;
  chapterNumber: number;
  pageNumber: number;
  note: string;
};

export type BookmarkCreateMutation = UseMutationResult<
  void,
  Error,
  BookmarkRequest,
  unknown
>;

export type BookmarkUpdateMutation = UseMutationResult<
  void,
  Error,
  {
    bookmarkId: number;
    requestBody: BookmarkRequest;
  },
  unknown
>;

export type BookmarkDeleteMutation = UseMutationResult<
  void,
  Error,
  number,
  unknown
>;
