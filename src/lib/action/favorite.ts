import { fetchActionWithAuth } from '@/lib/auth';

export const createFavorite = async (bookId: string) => {
  try {
    const url = `/me/favorites`;
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

export const deleteFavorite = async (bookId: string) => {
  try {
    const url = `/me/favorites/${bookId}`;
    const options: RequestInit = { method: 'DELETE' };
    await fetchActionWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
