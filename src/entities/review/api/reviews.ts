import type { ReviewPage, ReviewRequest } from '@/entities/review/model/types';
import { getCsrfToken } from '@/shared/api/csrf';
import { fetchBooksApi } from '@/shared/api/fetch';
import {
  DEFAULT_MY_PAGE_SIZE,
  DEFAULT_MY_PAGE_SORT,
} from '@/shared/config/constants';
import type { ReviewSortOrder } from '@/shared/config/sort-orders';
import { buildPath, buildQueryString } from '@/shared/lib/url-builder';

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

// 自分のレビュー一覧
export const getUserReviews = async (
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/reviews`;
  const queryString = buildQueryString({ page, size, sort });
  const response = await fetchBooksApi<ReviewPage>(path + queryString);
  return response.data;
};

// 自分が投稿した特定の書籍のレビュー
export const getUserReviewsByBookId = async (
  bookId: string,
  page: number = 1,
  size: number = DEFAULT_MY_PAGE_SIZE,
  sort: ReviewSortOrder = DEFAULT_MY_PAGE_SORT
) => {
  const path = `/me/reviews`;
  const queryString = buildQueryString({ bookId, page, size, sort });
  const response = await fetchBooksApi<ReviewPage>(path + queryString);
  return response.data;
};

// この書籍をユーザーがレビューしているかどうか
// （データの取得を試みてエラーなら未登録とする）
export const isReviewedByUser = async (bookId: string) => {
  try {
    const response = await getUserReviewsByBookId(bookId);
    return response.totalItems !== 0;
  } catch (error) {
    console.error('レビュー確認中にエラー:', error);
    return false;
  }
};
