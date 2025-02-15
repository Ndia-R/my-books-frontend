import { SimpleUserInfo } from '@/types';

export interface Review {
  userId: number;
  bookId: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: SimpleUserInfo;
}

export interface ReviewPage {
  page: number;
  totalPages: number;
  totalItems: number;
  reviews: Review[];
}

export interface ReviewSummary {
  bookId: string;
  reviewCount: number;
  averageRating: number;
}

export interface ReviewRequest {
  comment: string;
  rating: number;
}
