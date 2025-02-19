import { fetchActionWithAuth } from '@/lib/auth';
import { FavoriteRequest } from '@/types';

export const createFavorite = async (reqestBody: FavoriteRequest) => {
  try {
    const url = `/favorites`;
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

export const deleteFavorite = async (bookId: string) => {
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
