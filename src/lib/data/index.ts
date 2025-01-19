import { BOOKS_API_ENDPOINT } from '@/constants/constants';

export * from './book';
export * from './favorite';
export * from './genre';
export * from './my-list';
export * from './review';
export * from './user';

export const fetchJSON = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(`${BOOKS_API_ENDPOINT}${url}`, options);
  if (!res.ok) {
    throw new Error(`失敗しました。URL: ${url} ステータス: ${res.status}`);
  }
  return res.json();
};
