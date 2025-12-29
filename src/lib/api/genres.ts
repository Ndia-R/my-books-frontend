import { fetchBooksApi } from '@/lib/api/fetch';
import type { Genre } from '@/types';

// すべてのジャンル取得
export const getGenres = async () => {
  const path = `/genres`;
  const response = await fetchBooksApi<Genre[]>(path);
  return response.data;
};
