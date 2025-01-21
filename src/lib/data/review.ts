import { FETCH_REVIEWS_MAX_RESULTS } from '@/constants/constants';
import { fetchJsonWithAuth } from '@/lib/auth';
import { fetchJson } from '@/lib/data';
import { CheckMyReviewExists, PaginatedReview } from '@/types';

export const getReviews = async (bookId: string, page: number = 0) => {
  try {
    const url = `/reviews/${bookId}?&page=${page}&maxResults=${FETCH_REVIEWS_MAX_RESULTS}`;
    const paginatedReview = await fetchJson<PaginatedReview>(url);
    return paginatedReview;
  } catch {
    throw new Error('レビュー一覧の読み込みが失敗しました。');
  }
};

export const checkMyReviewExists = async (bookId: string) => {
  try {
    const url = `/reviews/my-reviews/exists?bookId=${bookId}`;
    const data = await fetchJsonWithAuth<CheckMyReviewExists>(url);
    if (!data) return false;
    return data.exists;
  } catch {
    return false;
  }
};
