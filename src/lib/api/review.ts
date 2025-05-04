import {
  FETCH_MY_REVIEWS_MAX_RESULTS,
  FETCH_REVIEWS_MAX_RESULTS,
} from '@/constants/constants';
import { customFetch } from '@/lib/api/fetch-client';
import {
  ReviewPage,
  ReviewRequest,
  ReviewSummary,
  SelfReviewExists,
} from '@/types';

export const getReviewPage = async (bookId: string, page: number = 0) => {
  try {
    const basePage = page > 0 ? page - 1 : 0;
    const endpoint = `/books/${bookId}/reviews`;
    const query = `?page=${basePage}&maxResults=${FETCH_REVIEWS_MAX_RESULTS}`;
    const response = await customFetch<ReviewPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('レビュー一覧の読み込みが失敗しました。');
  }
};

export const getReviewSummary = async (bookId: string) => {
  try {
    const endpoint = `/books/${bookId}/reviews/summary`;
    const response = await customFetch<ReviewSummary>(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('レビュー情報の読み込みが失敗しました。');
  }
};

export const checkSelfReviewExists = async (bookId: string) => {
  try {
    const endpoint = `/reviews/self-review-exists/${bookId}`;
    const response = await customFetch<SelfReviewExists>(endpoint);
    return response.data.exists;
  } catch (error) {
    console.error(error);
    throw new Error('レビューの存在チェックに失敗しました。');
  }
};

export const getReviewPageByUser = async (page: number = 0) => {
  try {
    const basePage = page > 0 ? page - 1 : 0;
    const endpoint = `/reviews`;
    const query = `?page=${basePage}&maxResults=${FETCH_MY_REVIEWS_MAX_RESULTS}`;
    const response = await customFetch<ReviewPage>(endpoint + query);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('マイレビュー一覧の読み込みが失敗しました。');
  }
};

export const createReview = async (requestBody: ReviewRequest) => {
  try {
    const endpoint = `/reviews`;
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('レビューの作成に失敗しました。');
  }
};

export const updateReview = async (id: number, requestBody: ReviewRequest) => {
  try {
    const endpoint = `/reviews/${id}`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('レビューの更新に失敗しました。');
  }
};

export const deleteReview = async (id: number) => {
  try {
    const endpoint = `/reviews/${id}`;
    const options: RequestInit = { method: 'DELETE' };
    await customFetch(endpoint, options);
  } catch (error) {
    console.error(error);
    throw new Error('レビューの削除に失敗しました。');
  }
};
