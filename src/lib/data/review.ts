import { FETCH_REVIEWS_MAX_RESULTS } from '@/constants/constants';
import { fetchJsonWithAuth } from '@/lib/auth';
import { fetchJson } from '@/lib/data';
import { CheckMyReviewExists, PaginatedReview, ReviewRatingInfo } from '@/types';

export const getReviewRatingInfo = async (bookId: string) => {
  try {
    const url = `/reviews/${bookId}/rating-info`;
    const reviewRatingInfo = await fetchJson<ReviewRatingInfo>(url);
    return reviewRatingInfo;
  } catch {
    throw new Error('レビュー情報の読み込みが失敗しました。');
  }
};

export const getReviewsById = async (bookId: string, page: number = 0) => {
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
