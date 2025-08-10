import { Book } from '@/types/domain/book';
import { UseMutationResult } from '@tanstack/react-query';

export type Bookmark = {
  id: number;
  userId: number;

  chapterNumber: number;
  chapterTitle: string;
  pageNumber: number;
  note: string;

  createdAt: string;
  updatedAt: string;
  book: Book;
};

export type BookmarkPage = {
  currentPage: number; // ページ番号は1ベース
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
  data: Bookmark[];
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
