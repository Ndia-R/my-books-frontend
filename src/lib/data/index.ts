import { BOOKS_API_ENDPOINT } from '@/constants/constants';

export * from './book';
export * from './book-chapter';
export * from './book-content-page';
export * from './bookmark';
export * from './favorite';
export * from './genre';
export * from './review';
export * from './user';

export const fetchJson = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
  if (!res.ok) {
    throw new Error(`失敗しました。URL: ${url} ステータス: ${res.status}`);
  }
  return res.json();
};
