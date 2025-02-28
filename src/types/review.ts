import { Book } from '@/types';

export interface Review {
  id: number;
  userId: number;
  bookId: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  book: Book;
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
  bookId: string;
  comment: string;
  rating: number;
}

export interface SelfReviewExists {
  exists: boolean;
}
