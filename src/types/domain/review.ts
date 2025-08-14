import { Book } from '@/types/domain/book';
import { Page } from '@/types/infrastructure';
import { UseMutationResult } from '@tanstack/react-query';

export type Review = {
  id: number;
  userId: number;

  name: string;
  avatarPath: string;
  comment: string;
  rating: number;

  createdAt: string;
  updatedAt: string;
  book: Book;
};

export type ReviewPage = Page<Review>;

export type ReviewStats = {
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

export type ReviewUpdateParams = {
  reviewId: number;
  requestBody: ReviewRequest;
};
export type ReviewUpdateMutation = UseMutationResult<
  void,
  Error,
  ReviewUpdateParams,
  unknown
>;

export type ReviewDeleteMutation = UseMutationResult<
  void,
  Error,
  number,
  unknown
>;
