import { User } from '@/types/user';

export interface Review {
  id: number;
  bookId: string;
  comment: string;
  rating: number;
  updatedAt: string;
  user: User;
}
