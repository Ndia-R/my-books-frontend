import { fetchActionWithAuth } from '@/lib/auth';

export const addMyList = async (bookId: string) => {
  try {
    const url = `/my-lists`;
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    };
    await fetchActionWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const removeMyList = async (bookId: string) => {
  try {
    const url = `/my-lists/${bookId}`;
    const options: RequestInit = { method: 'DELETE' };
    await fetchActionWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
