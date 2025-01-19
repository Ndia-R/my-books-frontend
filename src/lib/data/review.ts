import { FETCH_REVIEWS_MAX_RESULTS } from '@/constants/constants';
import { fetchJSON } from '@/lib/data';
import { sleep } from '@/lib/util';
import { PaginatedReview, Review } from '@/types';

export const getReviews = async (bookId: string, page: number = 0) => {
  try {
    const url = `/reviews/${bookId}?&page=${page}&maxResults=${FETCH_REVIEWS_MAX_RESULTS}`;
    const paginatedReview = await fetchJSON<PaginatedReview>(url);
    return paginatedReview;
  } catch {
    throw new Error('レビュー一覧の読み込みが失敗しました。');
  }
};

export const getReviewsByBookId = async (bookId: string) => {
  await sleep(2000);

  try {
    const url = `/reviews/book/${bookId}`;
    const reviews = await fetchJSON<Review[]>(url);
    return reviews;
  } catch {
    throw new Error('レビュー一覧の読み込みが失敗しました。');
  }
};
