import { Book } from '@/types/domain/book';
import { Page } from '@/types/infrastructure';
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

export type BookmarkPage = Page<Bookmark>;

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

export type BookmarkUpdateParams = {
  bookmarkId: number;
  requestBody: BookmarkRequest;
};
export type BookmarkUpdateMutation = UseMutationResult<
  void,
  Error,
  BookmarkUpdateParams,
  unknown
>;

export type BookmarkDeleteMutation = UseMutationResult<
  void,
  Error,
  number,
  unknown
>;
