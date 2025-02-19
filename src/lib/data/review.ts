import { FETCH_REVIEWS_MAX_RESULTS } from '@/constants/constants';
import { fetchJsonWithAuth } from '@/lib/auth';
import { fetchJson } from '@/lib/data';
import { sleep } from '@/lib/util';
import { Review, ReviewPage, ReviewSummary } from '@/types';

export const getReviewPage = async (bookId: string, page: number = 0) => {
  await sleep(2000);

  try {
    const url = `/books/${bookId}/reviews?&page=${page}&maxResults=${FETCH_REVIEWS_MAX_RESULTS}`;
    const reviewPage = await fetchJson<ReviewPage>(url);
    return reviewPage;
  } catch {
    throw new Error('レビュー一覧の読み込みが失敗しました。');
  }
};

export const getReviewSummary = async (bookId: string) => {
  await sleep(2000);

  try {
    const url = `/books/${bookId}/reviews/summary`;
    const reviewSummary = await fetchJson<ReviewSummary>(url);
    return reviewSummary;
  } catch {
    throw new Error('レビュー情報の読み込みが失敗しました。');
  }
};

export const checkMyReviewExists = async (bookId: string) => {
  try {
    const url = `/reviews/${bookId}`;
    await fetchJsonWithAuth<Review>(url);
    return true;
  } catch {
    return false;
  }
};
