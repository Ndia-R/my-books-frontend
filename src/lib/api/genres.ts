import { fetchBooksApi } from '@/lib/api/fetch';
import type { Genre } from '@/types';

// すべてのジャンル取得
export const getGenres = async () => {
  const endpoint = `/genres`;
  const response = await fetchBooksApi<Genre[]>(endpoint);
  return response.data;
};
