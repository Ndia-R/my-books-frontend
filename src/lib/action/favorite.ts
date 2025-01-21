import { fetchActionWithAuth } from '@/lib/auth';

export const addFavorite = async (bookId: string) => {
  try {
    const url = `/favorites`;
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

export const removeFavorite = async (bookId: string) => {
  try {
    const url = `/favorites/${bookId}`;
    const options: RequestInit = { method: 'DELETE' };
    await fetchActionWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
