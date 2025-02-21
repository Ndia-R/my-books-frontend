import { FETCH_REVIEWS_MAX_RESULTS } from '@/constants/constants';
import { useApi } from '@/hooks/api/use-api';
import { sleep } from '@/lib/util';
import { Review, ReviewPage, ReviewRequest, ReviewSummary } from '@/types';

export const useApiRevew = () => {
  const { fetcher, fetcherWithAuth, mutationWithAuth } = useApi();

  const getReviewPage = async (bookId: string, page: number = 0) => {
    await sleep(2000);

    try {
      const url = `/books/${bookId}/reviews?&page=${page}&maxResults=${FETCH_REVIEWS_MAX_RESULTS}`;
      const reviewPage = await fetcher<ReviewPage>(url);
      return reviewPage;
    } catch {
      throw new Error('レビュー一覧の読み込みが失敗しました。');
    }
  };

  const getReviewSummary = async (bookId: string) => {
    await sleep(2000);

    try {
      const url = `/books/${bookId}/reviews/summary`;
      const reviewSummary = await fetcher<ReviewSummary>(url);
      return reviewSummary;
    } catch {
      throw new Error('レビュー情報の読み込みが失敗しました。');
    }
  };

  const checkMyReviewExists = async (bookId: string) => {
    try {
      const url = `/reviews/${bookId}`;
      await fetcherWithAuth<Review>(url);
      return true;
    } catch {
      return false;
    }
  };

  const createReview = async (reqestBody: ReviewRequest) => {
    try {
      const url = `/reviews`;
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqestBody),
      };
      await mutationWithAuth(url, options);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const updateReview = async (id: number, reqestBody: ReviewRequest) => {
    try {
      const url = `/reviews/${id}`;
      const options: RequestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqestBody),
      };
      await mutationWithAuth(url, options);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const deleteReview = async (id: number) => {
    try {
      const url = `/reviews/${id}`;
      const options: RequestInit = {
        method: 'DELETE',
      };
      await mutationWithAuth(url, options);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return {
    getReviewPage,
    getReviewSummary,
    checkMyReviewExists,
    createReview,
    updateReview,
    deleteReview,
  };
};
