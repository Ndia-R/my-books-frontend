import { fetchBooksApi } from '@/lib/api/fetch';
import { getCsrfToken } from '@/lib/utils';
import type { ReviewRequest } from '@/types';

// レビュー作成
export const createReview = async (requestBody: ReviewRequest) => {
  const endpoint = `/reviews`;
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(endpoint, options);
};

// レビュー更新
export const updateReview = async (
  reviewId: number,
  requestBody: ReviewRequest
) => {
  const endpoint = `/reviews/${reviewId}`;
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(endpoint, options);
};

// レビュー削除
export const deleteReview = async (reviewId: number) => {
  const endpoint = `/reviews/${reviewId}`;
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  };
  await fetchBooksApi(endpoint, options);
};
