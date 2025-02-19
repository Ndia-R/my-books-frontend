import { fetchActionWithAuth } from '@/lib/auth';
import { ReviewRequest } from '@/types';

export const createReview = async (reqestBody: ReviewRequest) => {
  try {
    const url = `/reviews`;
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqestBody),
    };
    await fetchActionWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const updateReview = async (id: number, reqestBody: ReviewRequest) => {
  try {
    const url = `/reviews/${id}`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqestBody),
    };
    await fetchActionWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const deleteReview = async (id: number) => {
  try {
    const url = `/reviews/${id}`;
    const options: RequestInit = { method: 'DELETE' };
    await fetchActionWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
