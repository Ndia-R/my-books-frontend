import { Book } from '@/types/book';
import { UseMutationResult } from '@tanstack/react-query';

export type Review = {
  id: number;
  userId: number;
  bookId: string;
  name: string;
  avatarPath: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  book: Book;
};

export type ReviewPage = {
  page: number;
  totalPages: number;
  totalItems: number;
  reviews: Review[];
};

export type ReviewCounts = {
  bookId: string;
  reviewCount: number;
  averageRating: number;
};

export type ReviewRequest = {
  bookId: string;
  comment: string;
  rating: number;
};

export type SelfReviewExists = {
  exists: boolean;
};

export type ReviewCreateMutation = UseMutationResult<
  void,
  Error,
  ReviewRequest,
  unknown
>;

export type ReviewUpdateMutation = UseMutationResult<
  void,
  Error,
  {
    id: number;
    requestBody: ReviewRequest;
  },
  unknown
>;

export type ReviewDeleteMutation = UseMutationResult<
  void,
  Error,
  number,
  unknown
>;
