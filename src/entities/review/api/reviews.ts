import type { ReviewRequest } from '@/entities/review/model/types';
import { fetchBooksApi } from '@/shared/api/fetch';
import { buildPath } from '@/shared/api/url-builder';
import { getCsrfToken } from '@/shared/lib/utils';

// レビュー作成
export const createReview = async (requestBody: ReviewRequest) => {
  const path = `/reviews`;
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(path, options);
};

// レビュー更新
export const updateReview = async (
  reviewId: number,
  requestBody: ReviewRequest
) => {
  const path = buildPath('/reviews/:reviewId', { reviewId });
  const options: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCsrfToken(),
    },
    body: JSON.stringify(requestBody),
  };
  await fetchBooksApi(path, options);
};

// レビュー削除
export const deleteReview = async (reviewId: number) => {
  const path = buildPath('/reviews/:reviewId', { reviewId });
  const options: RequestInit = {
    method: 'DELETE',
    headers: {
      'X-XSRF-TOKEN': getCsrfToken(),
    },
  };
  await fetchBooksApi(path, options);
};
