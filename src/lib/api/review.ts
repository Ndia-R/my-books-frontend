import { customFetch } from '@/lib/api/fetch-client';
import { ReviewRequest } from '@/types';

// レビュー作成
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

// レビュー更新
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

// レビュー削除
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
