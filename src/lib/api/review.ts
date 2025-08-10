import { customFetch } from '@/lib/api/fetch-client';
import { ReviewRequest } from '@/types';

// レビュー作成
export const createReview = async (requestBody: ReviewRequest) => {
  const endpoint = `/reviews`;
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  await customFetch(endpoint, options);
};

// レビュー更新
export const updateReview = async (
  reviewId: number,
  requestBody: ReviewRequest
) => {
  const endpoint = `/reviews/${reviewId}`;
  const options: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  await customFetch(endpoint, options);
};

// レビュー削除
export const deleteReview = async (reviewId: number) => {
  const endpoint = `/reviews/${reviewId}`;
  const options: RequestInit = { method: 'DELETE' };
  await customFetch(endpoint, options);
};
