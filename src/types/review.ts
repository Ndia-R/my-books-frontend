import { Book } from '@/types/book';
import { SimpleUserInfo } from '@/types/user';

export interface Review {
  id: number;
  comment: string;
  rating: number;
  updatedAt: string;
  user: SimpleUserInfo;
  book: Book;
}

export interface CreateReview {
  comment: string;
  rating: number;
  bookId: string;
  userId: number;
}
