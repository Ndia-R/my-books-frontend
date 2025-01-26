import { SimpleUserInfo } from '@/types';

export interface ReviewId {
  userId: number;
  bookId: string;
}

export interface Review {
  reviewId: ReviewId;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: SimpleUserInfo;
}

export interface ReviewRequest {
  bookId: string;
  comment: string;
  rating: number;
}

export interface PaginatedReview {
  page: number;
  totalPages: number;
  totalItems: number;
  reviews: Review[];
}

export interface CheckMyReviewExists {
  exists: boolean;
}

export interface ReviewRatingInfo {
  bookId: string;
  rating: number;
  reviewCount: number;
}
