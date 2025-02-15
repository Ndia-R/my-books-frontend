import { fetchActionWithAuth } from '@/lib/auth';
import { BookmarkRequest } from '@/types';

export const createBookmark = async (reqestBody: BookmarkRequest) => {
  try {
    const url = `/me/bookmarks`;
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

export const updateBookmark = async (reqestBody: BookmarkRequest) => {
  try {
    const url = `/me/bookmarks`;
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

export const deleteBookmark = async (bookId: string) => {
  try {
    const url = `/me/bookmarks/${bookId}`;
    const options: RequestInit = { method: 'DELETE' };
    await fetchActionWithAuth(url, options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
